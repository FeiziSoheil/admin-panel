import React, { useContext } from "react";
import DashboardCard from "../../Components/DashboardCard/DashboardCard.jsx";

import SpentChart from "../../Components/SpentChart/SpentChart.jsx";
import InComeChart from "../../Components/InComeChart/InComeChart.jsx";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { SiCashapp, SiShopee } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";
import Example from "../../Components/UserChart/UserChart.jsx";
import LastTransAcrionCard from "../../Components/LastTransAcrionCard/LastTransAcrionCard.jsx";
import LastUserCard from "../../Components/lastUserCard/lastUserCard.jsx";
import UserChart from "../../Components/UserChart/UserChart.jsx";
import { ThemeContext } from "../../Context/ThemeContext.jsx";

export default function Dashboard() {

  const {isDark} = useContext(ThemeContext)
  const chartPng =  "/icons/chart.png";
  const inComePng =  "/icons/income.png";
  const expensesPng = "/icons/expenses.png"
  const billPng = "/icons/bill.png"
  const savingsPng = "/icons/savings.png"

  return (
    <div>
      <header className="flex w-full justify-between  gap-5 ">
        <DashboardCard
          title={"Spent this month"}
          content={"851,75$"}
          src={chartPng}
        />
        <DashboardCard
          title={"Income this month"}
          content={"1,245$"}
          src={inComePng}
        />
        <DashboardCard
          title={"Total Expenses"}
          content={"3,672$"}
          src={expensesPng}
        />
        <DashboardCard
          title={"Pending Bills"}
          content={"4"}
          src={billPng}
        />
        <DashboardCard
          title={"Savings Rate"}
          content={"42%"}
          src={savingsPng}
        />
      </header>
      <main className="mt-14 pb-5">
        <div className="row1 flex space-x-4 w-full">
          {/* spent chart */}
          <div className={`${isDark?'bg-[#252436] border-[#2A2A3C]':'bg-white'} flex-1 border  rounded-2xl h-full flex flex-col`}>
            <div className="flex flex-col items-center justify-center mt-14 space-y-4">
              <p className="font-inter text-Subtitle  text-lg">
                Current Month Spending
              </p>
              <h2 className="font-poppins text-5xl font-bold ">857,75$</h2>
              <p className="font-inter bg-greenBG text-greenTxt px-2 py-1 rounded-xl ">
                14%+
              </p>
            </div>

            <div className="flex-1 ">
              <SpentChart />
            </div>
          </div>

          {/* income chart */}
          <div className={`${isDark?'bg-[#252436] border-[#2A2A3C]':'bg-white'} flex-1 border  rounded-2xl h-full flex flex-col`}>
            <div className="flex px-5 py-6 justify-between items-start">
              <div className="space-y-1">
                <p className="font-inter text-Subtitle  text-base">
                  Income thie month
                </p>
                <h2 className="font-poppins text-4xl font-semibold">682.5$</h2>
                <span className="flex text-green-500 items-center gap-2">
                  <IoCheckmarkCircle style={{ fontSize: "1.4rem" }} />
                  <p className="font-inter text-lg">On track</p>
                </span>
              </div>
              <span className="flex items-center">
                <TiArrowSortedUp className="text-greenTxt" />
                <p className="font-inter text-greenTxt px-2 py-1 rounded-xl">
                  14%
                </p>
              </span>
            </div>

            <div className="flex-1 ">
              <InComeChart />
            </div>
          </div>

          {/* 4 latest transaction */}
          <LastTransAcrionCard/>
        </div>

        {/* row 2 */}

        <div className="row2 flex mt-5 gap-4">
          <div className={`${isDark?'bg-[#252436] border-[#2A2A3C]':'bg-white'} chart-wrapper  border  rounded-2xl h-full flex flex-col w-2/3`}>
            <div className="flex px-5 py-6 justify-between items-start">
              <div className="space-y-1">
                <p className="font-inter text-Subtitle text-base">
                  Income this month
                </p>
                <h2 className="font-poppins text-4xl font-semibold">42 Users</h2>
                <span className="flex text-green-500 items-center gap-2">
                  <IoCheckmarkCircle style={{ fontSize: "1.4rem" }} />
                  <p className="font-inter text-lg">On track</p>
                </span>
              </div>
              <span className="flex items-center">
                <TiArrowSortedUp className="text-greenTxt" />
                <p className="font-inter text-greenTxt px-2 py-1 rounded-xl">
                  14%
                </p>
              </span>
            </div>

            <div className="flex-1">
              <UserChart />
            </div>
          </div>
          {/* last users */}
        <LastUserCard/>
        </div>
      </main>
    </div>
  );
}
