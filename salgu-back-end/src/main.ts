import loadConfig from './config/configuration';
import { createAppInstance } from './utils/start-up';

export async function bootstrap() {
  const config = loadConfig();
  const app = await createAppInstance({ config });

  const port = config?.http?.port || 3000;
  console.log(`Listening on port ${port}`);

  await app.listen(port);
}
bootstrap();
