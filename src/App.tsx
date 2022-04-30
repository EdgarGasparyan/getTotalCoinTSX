import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import axios from "axios";
// import ReactEcharts from 'echarts';
import ReactEcharts from "echarts-for-react";


type wal = { [key: string]: number };
type arr = Array<number>;
const App: React.FC = () => {
  const [hours, setHours] = useState<any>([]);
  const [max, setMax] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [flag, setFlag] = useState<boolean>(true);
  const [toggleButton, setToggleButton] = useState<number |null| string>(1);
  const dataHours = useMemo<Promise<any>>(async () => {
    const btc = await axios(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30`
    );
    const eth = await axios(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30`
    );
    const maker = await axios(
      `https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=30`
    );
    const monero = await axios(
      `https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=30`
    );
    const litecoin = await axios(
      `https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=30`
    );
    return {
      btc: btc.data.prices,
      eth: eth.data.prices,
      maker: maker.data.prices,
      monero: monero.data.prices,
      ltc: litecoin.data.prices,
    };
  }, []);
  const dataMax = useMemo<Promise<any>>(async () => {
    const btc = await axios(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`
    );
    const eth = await axios(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max`
    );
    const maker = await axios(
      `https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=max`
    );
    const monero = await axios(
      `https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=max`
    );
    const litecoin = await axios(
      `https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=max`
    );
    return {
      btc: btc.data.prices,
      eth: eth.data.prices,
      maker: maker.data.prices,
      monero: monero.data.prices,
      ltc: litecoin.data.prices,
    };
  }, []);
  useEffect(() => {
    dataHours.then((res: any) => {
      setHours(res);
    });
    dataMax.then((res: any) => {
      setMax(res);
    });
  }, []);
  const wallet: wal = {
    btc: 0.5,
    eth: 1.3,
    maker: 5.7,
    monero: 3.8,
    ltc: 8.9,
  };
  const btca: arr = hours?.btc?.map((price: arr) => {
    return price[1] * wallet.btc;
  });
  const etha: arr = hours?.eth?.map((price: arr) => {
    return price[1] * wallet.eth;
  });
  const makera: arr = hours?.maker?.map((price: arr) => {
    return price[1] * wallet.maker;
  });
  const moneroa: arr = hours?.monero?.map((price: arr) => {
    return price[1] * wallet.monero;
  });
  const ltca: arr = hours?.litecoin?.map((price: arr) => {
    return price[1] * wallet.ltc;
  });
  const arr: arr = [];
  const btcarray: arr = btca?.reverse();
  const etharray: arr = etha?.reverse();
  const makerarray: arr = makera?.reverse();
  const moneroarray: arr = moneroa?.reverse();
  const ltcarray: arr = ltca?.reverse();
  for (let i = 0; i < hours?.btc?.length; i++) {
    arr[i] =
      (btcarray?.[i] ?? 0) +
      (makerarray?.[i] ?? 0) +
      (moneroarray?.[i] ?? 0) +
      (ltcarray?.[i] ?? 0) +
      (etharray?.[i] ?? 0);
  }
  const arr1: arr = arr.reverse();
  const datatime: arr = hours?.btc?.map((time: arr) => {
    return time[0];
  });
  const Totalhours: number[][] = [];
  for (let i = 0; i < arr1.length; i++) {
    Totalhours[i] = new Array(datatime[i], arr1[i]);
  }
  ///////////////   MAX   ////////////
  const btcm: arr = max?.btc?.map((price: arr) => {
    return price[1] * wallet.btc;
  });
  const ethm: arr = max?.eth?.map((price: arr) => {
    return price[1] * wallet.eth;
  });
  const makerm: arr = max?.maker?.map((price: arr) => {
    return price[1] * wallet.maker;
  });
  const monerom: arr = max?.monero?.map((price: arr) => {
    return price[1] * wallet.monero;
  });
  const ltcm: arr = max?.litecoin?.map((price: arr) => {
    return price[1] * wallet.ltc;
  });
  const arrm: arr = [];
  const btcarraym: arr = btcm?.reverse();
  const etharraym: arr = ethm?.reverse();
  const makerarraym: arr = makerm?.reverse();
  const moneroarraym: arr = monerom?.reverse();
  const ltcarraym: arr = ltcm?.reverse();
  for (let i = 0; i < max?.btc?.length; i++) {
    arrm[i] =
      (btcarraym?.[i] ?? 0) +
      (makerarraym?.[i] ?? 0) +
      (moneroarraym?.[i] ?? 0) +
      (ltcarraym?.[i] ?? 0) +
      (etharraym?.[i] ?? 0);
  }
  const arr1m: arr = arrm.reverse();
  const datatimem: arr = max?.btc?.map((time: arr) => {
    return time[0];
  });
  const Totalmax: number[][] = [];
  for (let i = 0; i < arr1m.length; i++) {
    Totalmax[i] = new Array(datatimem[i], arr1m[i]);
  }
  const handleClick = (x: number | null | string) => {
    if (x === 1) {
      setData(Totalhours.slice(697, Totalhours.length));
    } else if (x === 7) {
      setData(Totalhours.slice(553, Totalhours.length));
    } else if (x === 14) {
      setData(Totalhours.slice(385, Totalhours.length));
    } else if (x === 30) {
      setData(Totalhours);
    } else if (x === 90) {
      setData(Totalmax.slice(3194, Totalmax.length));
    } else if (x === 200) {
      setData(Totalmax.slice(3084, Totalmax.length));
    } else if (x === 365) {
      setData(Totalmax.slice(2919, Totalmax.length));
    } else if (x === "max") {
      setData(Totalmax);
    }
  };
  useEffect(() => {
    if (flag === true) {
      setData(Totalhours.slice(697, Totalhours.length));
      // bbb()
    }
    setTimeout(() => {
      setFlag(false);
    }, 1000);
  }, [Totalhours]);
  const options = {
    xAxis: {
      type: "time",
    },
    yAxis: {},
    dataZoom: [
      {
        start: 0,
        end: 100,
        type: "inside",
      },
      {
        type: "slider",
        show: true,
        start: 0,
        end: 100,
        handleSize: 8,
      },
      // {
      //   type: 'inside',
      //   start: 94,
      //   end: 100
      // },
      // {
      //   type: 'slider',
      //   show: true,
      //   yAxisIndex: 0,
      //   filterMode: 'empty',
      //   width: 12,
      //   height: '70%',
      //   handleSize: 8,
      //   showDataShadow: false,
      //   left: '93%'
      // }
    ],
    series: [
      {
        name: "$",
        color: "red",
        symbol: "none",
        areaStyle: {},
        data: data,
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  const toggleClass = (event: number | string): void => {
    setToggleButton(event);
    localStorage.setItem("button", JSON.stringify(event))
  };
     useMemo( () => {
      let aaa:any;
       try {
        const stored = localStorage.getItem('button');
        aaa=stored
          ? JSON.parse(stored)
          :  toggleClass(1);
         handleClick?.(aaa);
         setToggleButton(aaa);
      } catch (err) {
          console.error("No data to show");
          return undefined;
  }
    },[flag])
    // const bbb = () =>{
    //   setTimeout(() => {
    //     handleClick(200);
    //     setData(Totalmax.slice(3084, Totalmax.length));
    //     toggleClass(200)
    //   }, 6000);
    //  }
  return (
    <>
      <div className="buttons_div">
        <button
          className={toggleButton === 1 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(1);
            toggleClass(1);
          }}
        >
          1day
        </button>
        <button
          className={toggleButton === 7 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(7);
            toggleClass(7);
          }}
        >
          7day
        </button>
        <button
          className={toggleButton === 14 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(14);
            toggleClass(14);
          }}
        >
          14day
        </button>
        <button
          className={toggleButton === 30 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(30);
            toggleClass(30);
          }}
        >
          30day
        </button>
        <button
          className={toggleButton === 90 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(90);
            toggleClass(90);
          }}
        >
          90day
        </button>
        <button
          className={toggleButton === 200 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(200);
            toggleClass(200);
          }}
        >
          200day
        </button>
        <button
          className={toggleButton === 365 ? "button bactive" : "button"}
          onClick={() => {
            handleClick(365);
            toggleClass(365);
          }}
        >
          1year
        </button>
        <button
          className={toggleButton === "max" ? "button bactive" : "button"}
          onClick={() => {
            handleClick("max");
            toggleClass("max");
          }}
        >
          Max
        </button>
      </div>
      <ReactEcharts option={options} />
    </>
  );
};
export default App;