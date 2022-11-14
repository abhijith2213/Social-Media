import React from "react";
import {GrAdd} from 'react-icons/gr'

import profile2 from '../../../../assets/images/profile11.jpg'


function RightSidebar() {
  return (
                      <div className="bg-white m-12 rounded-md p-8 fixed right-0 top-0 hidden lg:block">
                            <p className="mb-6">Suggested</p>
                            <div className="flex justify-between mb-5 gap-11">
                              <div className="flex">                               
                                    <img className="rounded-full w-14 " src={profile2} alt="pic" />                               
                                  <div className="flex items-center ml-3">
                                    <p className="font-medium text-sm">username</p>
                                  </div>
                              </div>
                              <span title="save" className="m-4 ">{React.createElement(GrAdd, { size: 20 })}</span>
                            </div>

                            <div className="flex justify-between flex-wrap mb-3">
                              <div className="flex ">                               
                                    <img className="rounded-full align-middle w-14 h-auto" src={profile2} alt="pic" />                               
                                  <div className="flex items-center ml-3">
                                    <p className="font-medium text-sm">username</p>
                                  </div>
                              </div>
                              <span title="save" className="m-4 ">{React.createElement(GrAdd, { size: 20 })}</span>
                            </div>
                      </div>
  )
}

export default RightSidebar;
