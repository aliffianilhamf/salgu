"use client";
import InputBlock from '@/components/Input/Form'
import React, { useEffect, useState } from 'react'
import api from "@/api";
import { useRouter } from 'next/navigation';
import { FC } from "react";
import { Dir } from "@/types";
import { getDir } from '../actions';

export default function FolderCreation({ params }: any) {
  const dirId: string = params.id;
  const [parentPath, setParentPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (dirId)
      getDir(dirId).then((res) => {
        setParentPath(res.path);
      });
  }, [dirId])

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const path = parentPath + '/' + name;
    api.post('/dirs', { path }).then(() => {
      router.push(`/drive/folders/${dirId}`)
    });
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <form className='mt-3' onSubmit={handleSubmit}>
            <p>Parent path: {parentPath}</p>
            <InputBlock
              name="name"
              type="text"
              placeholder='Enter Folder Name'
            >
              Name Path
            </InputBlock>
            <button type="submit" className='btn btn-outline-dark mt-3'>Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
