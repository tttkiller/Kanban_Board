import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card } from './Card';
import { Navbar } from './Navbar';
import { FaCheckCircle } from "react-icons/fa";
import { MdNetworkWifi1Bar } from "react-icons/md";
import { MdNetworkWifi2Bar } from "react-icons/md";
import { MdNetworkWifi3Bar } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { RxBorderDotted } from "react-icons/rx";
import { PiFireSimpleFill } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import { FaBarsProgress } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

export const Single = ({navname,flag,icon=<FaCheckCircle/>,sort,avai}) => {
  // console.log(navname,avai);
  const [task,settask] = useState([]);
  const prior = ["No Priority","Urgent","High","Medium","Low"];
  const icons = [<RxBorderDotted/>,<PiFireSimpleFill style={{color:"orange"}}/>,<MdNetworkWifi3Bar/>,<MdNetworkWifi2Bar/>,<MdNetworkWifi1Bar/>];
  
  useEffect(()=>{
    getalltask(navname,flag);
  },[])

  const getalltask = async  (name,flag) => {
    try {
      let res = null;

      if(flag=="user"){
          try {
              res = await axios.get("https://backend-eight-peach.vercel.app/api/quick/getuser",{
              params:{
              Name:name,
            }
          });
          settask(res.data.tasks);
          } catch (error) {
            console.log(error);
          }
      }
      else if(flag=="priority"){
          try {

            const priority = parseInt(navname);
            console.log(priority);

            res = await axios.get("https://backend-eight-peach.vercel.app/api/quick/gettaskpriority",{
              params:{
                Priority:priority,
              }
            });

            settask(res.data.tasks);

          } catch (error) {
            console.log(error);
          }

      }
      else if(flag=="status"){
        try {
          res = await axios.get("https://backend-eight-peach.vercel.app/api/quick/gettask",{
            params:{
              Status:name,
            }
          });
          settask(res.data.tasks);

        } catch (error) {
          console.log(error);
        }
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  
  const str = parseInt(navname);

  const handlesort = async () => {
    try {
      if(sort==="priority"){
        const sortedArray = [...task].sort((p1, p2) => (p1.Priority> p2.Priority) ? 1 : (p1.Priority < p2.Priority) ? -1 : 0);
        settask(sortedArray);
      }
      else if(sort==="status"){
        const sortedArray = [...task].sort((p1, p2) => (p1.Title> p2.Title) ? 1 : (p1.Title < p2.Title) ? -1 : 0);
        settask(sortedArray);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(sort);

  useEffect(()=>{
    handlesort();
  },[sort])

  return (
    <Main>
        {flag=="priority"?
          <Navbar name={prior[str]} count = {task.length} icon={icons[str]} flag={flag}/>
          :
          <Navbar name={navname} count = {task.length} icon={icon} flag={flag} avai={avai}/>
        }
        {
          flag=="user"?<>
          {
            task.map((idx,index)=>{
              return <Card card={idx} flag="user"/>
            })
          }
          </>:<>
          {
            task.map((idx,index)=>{
              return <Card card={idx}/>
            })
          }
          </>
        }
    </Main>
  )};
const Main = styled.div`
  width:auto;
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: 1600px) {
        height: auto;
        width:auto;
        align-self: flex-start;
        /* justify-self: center; */
  }
  @media screen and (max-width: 900px) {
        align-self: flex-start;
        width:auto;

  }
`
