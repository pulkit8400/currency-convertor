let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns)
    {
        for(let currCode in countryList)
            {
                let newOption=document.createElement("option");
                newOption.innerText=currCode;
                newOption.value=currCode;
                if(select.name==="from" && currCode==="USD")
                    {
                        newOption.selected="selected";
                    }
                else if(select.name==="to" && currCode==="INR")
                    {
                        newOption.selected="selected";
                    }
                select.append(newOption);

                select.addEventListener("change",(evt)=>{
                    updateFlag(evt.target);
                })
            }
    }

let updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updExchRate();
})

let updExchRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<1)
        {
            amtVal=1;
            amount.value="1";
        }

    let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const response =await fetch(URL);
    const data = await response.json();
    let to = toCurr.value.toLowerCase();
    let from = fromCurr.value.toLowerCase();
    let rate=data[from][to];
    let finalAmount=rate*amtVal;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updExchRate();
})