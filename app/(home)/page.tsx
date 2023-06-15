import GenerateLink from "@/components/GenerateLink";

export default function Home() {
  var username;
  return (
   <>
   <div className="mx-auto w-screen bg-gray-900/90 h-screen flex justify-center overflow-hidden">
      <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-900 text-gray-100">
        <GenerateLink/>
      </div>
    </div>
    
   </>
  );
}
