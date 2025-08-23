import React from "react";
import { ProfileLeft } from "../components/ProfileLeft";
import ProfileR from "../components/ProfleR";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../atom/atom";

export function Setting() {
  const data = useRecoilValue(userDataAtom);

  return (
    <div className="min-h-[calc(100vh-70px)] md:px-[3%] flex flex-col md:flex-row gap-4">
      <div className="md:basis-[35%] md:border-r-2 p-2 pt-[40px] md:pt-[70px] mdml-[-40px] overflow-y-auto">
        <ProfileLeft {...data} />
      </div>

      <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-65px)]">
        <ProfileR />
      </div>
    </div>
  );
}
