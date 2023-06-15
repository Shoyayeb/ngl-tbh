"use client";
import getNames from "@/libs/getNames";
import sendMessage from "@/libs/sendMessage";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Home() {
  const path = useParams()
  const [loading, setLoading] = useState<Boolean>(true);
  const [sent, setSent] = useState<Boolean>(false);
  const gotUser = getNames(path.slug);
  if (gotUser) {
    console.log(gotUser)
    notFound();
  }
  console.log(path.slug)
  const [message, setMessage] = useState<string>("");
  const send = () => {
    setLoading(true);
    sendMessage(message, path.slug)
      .then((res) => {
        toast.success("Message Sent");
      })
      .catch((err) => toast.error("Oops! Something went wrong"))
      .finally(() => setLoading(false));
  };
  return (
    <div className="mx-auto w-full bg-yellow-500/60 h-screen flex justify-center">
      <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-900 text-gray-100">
        {!sent ?<div className="flex flex-col items-center w-full">
          <h2 className="text-3xl font-semibold text-center">
            Send Anonymous Message
          </h2>
          <div className="flex flex-col items-center py-6 space-y-3">
            <span className="text-center">How was your experience?</span>
          </div>
          <div className="flex flex-col w-full">
            <textarea
              rows={3}
              placeholder="Message..."
              {...(loading && {
                disabled: true,
              })}
              onChange={(e) => setMessage(e.target.value)}
              className="p-4 rounded-md resize-none text-gray-100 bg-gray-800"
            ></textarea>
            <button
              type="button"
              {...(loading && {
                disabled: true,
              })}
              onClick={send}
              className="py-4 my-8 font-semibold rounded-md text-gray-900 bg-violet-400"
            >
              Send Anonymous Message
              {loading && (
                <span className="spinner-border spinner-border-sm animate-spin w-1 h-1"></span>
              )}
            </button>
          </div>
        </div>:<>
                <div className="flex flex-col items-center w-full">
                  <h2 className="text-3xl font-semibold text-center">
                    Message Sent
                  </h2>
                  <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-center">Your message has been sent!</span>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col items-center w-full">
                      <p className="text-sm text-gray-500">
                        {gotUser}
                      </p>
                    </div>
                  </div>
                </div>
      
        </>}
        {/* <div className="flex items-center justify-center">
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-sm text-gray-400"
          >
            Maybe later
          </a>
        </div> */}
      </div>
    </div>
  );
}
