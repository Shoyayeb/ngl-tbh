"use client";

import getNames from "@/libs/getNames";
import setUser from "@/libs/setUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const GenerateLink = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const router = useRouter();
  const handleGenerate = async (name: string) => {
    const docs = await getNames(name.toLowerCase());
    if (docs) {
      setLink(name.toLowerCase());
      setDuplicate(false);
      const user = setUser(name.toLowerCase());
      toast.success('🦄 Username created!', {
        position: "bottom-left",
        duration: 4000
        });
    } else {
      setDuplicate(true);
      toast.error('Username already taken',{
        position: "bottom-right",
        duration: 5000,
      })
    }
  };
  const copyText = () => {
    navigator.clipboard.writeText(`ngl-tbh.vercel.app/${link}`);
    toast.success('🦄 Link Copied!', {
      position: "bottom-left",
      duration: 5000,
      });
  };
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-semibold text-center">Username</h2>
      <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col w-full my-8">
        {link ? (
          <input
            type="text"
            value={`ngl-tbh.vercel.app/${link}`}
            onClick={() =>
              navigator.clipboard.writeText(`ngl-tbh.vercel.app/${link}`)
            }
            className="p-4 rounded-md resize-none text-gray-100 bg-gray-800 select-all"
          />
        ) : (
          <input
            type="text"
            placeholder="ex: john"
            required
            onChange={(e) => {
              // handleChange(e.target.value);
              setName(e.target.value);
            }}
            className="p-4 rounded-md resize-none text-gray-100 bg-gray-800"
          ></input>
        )}
        {duplicate && (
          <div className="flex flex-col items-center py-6 space-y-3">
            <span className="text-center text-lg font-bold text-rose-500">
              Username not available
            </span>
          </div>
        )}
        <button
          {...(link
            ? {
                onClick: () => copyText(),
              }
            : {
                onClick: () => handleGenerate(name),
              })}
          className="py-4 my-8 font-semibold rounded-md text-gray-900 bg-violet-400"
        >
          {link ? "Copy Link" : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default GenerateLink;
