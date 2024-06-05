import { useEffect, useState } from "react";
import "./Involvement.css"
import ConnectionCard from "../cards/ConnectionCard";
import axios from "axios";



const Involvement = () => {
    const [scrollControl, setScrollControl] = useState(true);
    const [control, setControl] = useState(false);
    const [allVCDate, setVCDate] = useState([]);
    const [showVCDates, setShowVCDates] = useState([]);
    const [buttonClick, setButtonClick] = useState(false);
    const [adet, setAdet] = useState(13);

    const getList = async () => {
      // Kullanıcı adı ve şifreyi kontrol et
      const response = await axios.get("http://localhost:3004/VCData");
      console.log(response.data)
      setVCDate(response.data)
    };
    useEffect(() => {
      getList();
    }, []);


    const listRefresh = (listLength) =>{
        let counter =0
        if (showVCDates.length>0) {
            showVCDates.splice(0,showVCDates.length)
        }
        allVCDate.map((item)=>{
          counter++ 
          if (counter<listLength) {
            showVCDates.push(item)
          }
        })
      }
      useEffect(() => {
        if (allVCDate.length>0) {
        setControl(false)
        listRefresh(adet)
        setControl(true)
        setScrollControl(!scrollControl)
        }
  
      }, [allVCDate]);

      useEffect(() => {
        const handleScroll = (e)=>{
          const scrollHeight = e.target.documentElement.scrollHeight
          const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
          if ((currentHeight+1 >= scrollHeight)) {
            let listLength = adet+4
            setAdet(adet+4)
            listRefresh(listLength)
            setTimeout(() => {
              setScrollControl(scrollControl? !scrollControl:!scrollControl)
            }, 100);
            
          }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
        
      }, [scrollControl]);

    return(
        <>
        <section>
            <div className="involvementBody">
                {!control && (<div>
                    loading...
                </div>)}{control &&(<div className="involvementInfo">Önerge Kategori Listesi</div>)}
                {control && (<div className="cardList">
                    {showVCDates.length>0 && (showVCDates.map((item)=>{
                        return(
                        <>
                            <ConnectionCard ownerName={item.owner} votingCategory={item.category} pin={item.pin}/>
                        </>
                        )
                    }))}
                    
                </div>)}
            </div>
            
        </section>
        </>
    );
}

export default Involvement;