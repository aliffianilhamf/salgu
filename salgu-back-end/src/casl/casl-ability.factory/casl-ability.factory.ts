import {
  AbilityBuilder,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Action, Subject } from '../types';
import { FileEntity } from 'src/files/entities/file.entity';
import { DirEntity } from 'src/dirs/entities/dir.entity';

type AppAbility = MongoAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.isAdmin) {
      can('manage', 'all');
      return build();
    }

    const userId = user.id;
    const domain = user.email.split('@')[1];

    can('manage', FileEntity, { ownerId: userId });
    can('manage', DirEntity, { ownerId: userId });

    const x = [
      ['read', 'read'],
      ['read', 'read-write'],
      ['update', 'read-write'],
    ] as const;
    const y = [DirEntity, FileEntity] as const;

    // TODO: Make this better

    for (const [actionCasl, actionDb] of x) {
      for (const subject of y) {
        can(actionCasl, subject, {
          permissions: {
            $elemMatch: {
              userIds: userId,
              level: actionDb,
            },
          },
        });
        can(actionCasl, subject, {
          permissions: {
            $elemMatch: {
              domains: domain,
              level: actionDb,
            },
          },
        });
      }
    }

    return build();
  }
}
