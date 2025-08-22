import React from "react";
import { ProfileLeft } from "../components/ProfileLeft";
import ProfileR from "../components/ProfleR";
import { useRecoilValue } from "recoil";
import { userState } from "../atom/atoms";
import { userDataAtom } from "../atom/atom";

export function Setting() {
  const data = useRecoilValue(userDataAtom);
  return (
    <div className="min-h-[calc(100vh-69px)] md:px-[10%] flex flex-col md:flex-row gap-4">
      <div className="md:basis-[35%] md:border-r-2 p-2 pt-[40px] md:pt-[70px]">
        <ProfileLeft {...data}/>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <ProfileR />
      </div>
    </div>
  );
}
