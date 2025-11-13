"use client";

export default function LovableBackground() {
  return (
    <>
      {/* Base color */}
      <div className="absolute inset-0 -z-10 bg-[#fcfbf8]" />
      
      {/* Blurred background image - STRONG AND VIBRANT */}
      <div className="overflow-hidden absolute w-full left-0 top-0 right-0 bottom-0 -z-10">
        <div className="absolute left-0 top-0 right-0 bottom-0 blur-[10px]">
          <div 
            className="aspect-square bg-top bg-no-repeat bg-cover overflow-hidden absolute w-[190%] left-[50%] -translate-x-1/2" 
            style={{backgroundImage: "url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F54efbaf8485b77d58cfb13c325c723279386b269.webp?generation=1760473591335668&alt=media\")"}}
          />
        </div>
      </div>
      
      {/* Texture overlay */}
      <div 
        className="bg-blend-overlay mix-blend-overlay absolute left-0 top-0 right-0 bottom-0 -z-10" 
        style={{
          backgroundImage: "url(\"https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fd00c0112116b86aa86a687f345a6b327ef8fc3d9.png?generation=1760473591316771&alt=media\")",
          backgroundSize: "100px 100px"
        }}
      />
    </>
  );
}

