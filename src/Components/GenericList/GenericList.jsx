import React, { useContext, useState } from "react";
import { Search } from "@mui/icons-material";
import { MdSpaceDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import AotuBreadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CustomSelect from "../CustomSelect/CustomSelect ";
import { Button } from "@mui/material";
import { ThemeContext } from "../../Context/ThemeContext";

const GenericCard = ({ item, columns, isLoading }) => {
  const actionsColumn = columns.find((col) => col.header === "Actions");
  const {isDark} = useContext(ThemeContext);

  if (isLoading) {
    return (
      <div className={`${isDark ? 'bg-[#252436] border-[#2A2A3C]' : 'bg-white'} border rounded-2xl p-4 hover:shadow-sm transition-shadow duration-300 flex flex-col`}>
        <div className="flex-grow">
          {columns.map((column, index) => {
            if (column.header === "Actions") return null;
            return (
              <div
                key={index}
                className="flex items-center justify-between mb-3"
              >
                <p className={`font-semibold font-poppins ${isDark ? 'text-white' : 'text-gray-600'}`}>
                  {column.header}:
                </p>
                <div className="text-right font-inter w-32">
                  <SkeletonTheme baseColor={isDark ? '#2d2c3e' : '#f8fafc'} highlightColor={isDark ? '#383750' : '#dbeafe'}>
                    <Skeleton />
                  </SkeletonTheme>
                </div>
              </div>
            );
          })}
        </div>
        {actionsColumn && (
          <div className={`mt-1 pt-4 ${isDark ? 'border-[#404057]' : 'border-gray-200'} border-t flex justify-center`}>
            <SkeletonTheme baseColor={isDark ? '#2d2c3e' : '#f8fafc'} highlightColor={isDark ? '#383750' : '#dbeafe'}>
              <Skeleton width={200} height={30} />
            </SkeletonTheme>
          </div>
        )}
      </div>
    );
  }

  // Rest of the GenericCard component remains the same
  return (
    <div className={`${isDark ? 'bg-[#252436] border-[#2A2A3C]' : 'bg-white'} border rounded-2xl p-4 hover:shadow-sm transition-shadow duration-300 flex flex-col`}>
      <div className="flex-grow">
        {columns.map((column, index) => {
          if (column.header === "Actions") return null;
          return (
            <div key={index} className="flex items-center justify-between mb-3">
              <p className={`font-semibold font-poppins ${isDark ? 'text-white' : 'text-gray-600'}`}>
                {column.header}:
              </p>
              <div className={`text-right font-inter ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {column.render ? column.render(item) : item[column.field]}
              </div>
            </div>
          );
        })}
      </div>
      {actionsColumn && (
        <div className={`mt-1 pt-4 ${isDark ? 'border-[#404057]' : ''} border-t flex justify-center space-x-2`}>
          {actionsColumn.render(item)}
        </div>
      )}
    </div>
  );
};

const LoadingTableRow = ({ columns, isDark }) => (
  <tr>
    {columns.map((_, index) => (
      <td key={index} className="py-5 font-inter font-normal text-center">
        <SkeletonTheme baseColor={isDark ? '#2d2c3e' : '#f8fafc'} highlightColor={isDark ? '#383750' : '#dbeafe'}>
          <Skeleton
            className="mx-auto"
            style={{ width: "80%", height: "24px" }}
          />
        </SkeletonTheme>
      </td>
    ))}
  </tr>
);

// Rest of the component remains the same
export default function GenericList({
  data = [],
  columns = [],
  onSearch,
  path = "",
  styles = {},
  viewMode = "table",
  onViewModeChange = () => {},
  isLoading = false,
  sortOptions = [],
  onSort,
  onAddNew,
}) {
  const [sortOption, setSortOption] = useState("-1");
  const {isDark} = useContext(ThemeContext);

  // Rest of the component implementation...
  const renderView = () => {
    if (viewMode === "table") {
      return (
        <table className="w-full">
          <thead className={`${isDark ? 'bg-[#252436]' : 'bg-slate-50'}`}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="py-5 font-inter font-semibold text-center"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <LoadingTableRow key={index} columns={columns} isDark={isDark} />
                ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-5 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className={`${isDark ? 'hover:bg-cardDark' : 'hover:bg-blue-50'}`}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="py-5 font-inter font-normal text-center"
                    >
                      {column.render ? column.render(item) : item[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array(8)
            .fill(0)
            .map((_, index) => (
              <GenericCard
                key={index}
                item={{}}
                columns={columns}
                isLoading={true}
              />
            ))
        ) : data.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            No data available
          </div>
        ) : (
          data.map((item, index) => (
            <GenericCard
              key={index}
              item={item}
              columns={columns}
              isLoading={false}
            />
          ))
        )}
      </div>
    );
  };

  // Return statement remains the same
  return (
    <section className="min-h-screen mt-5">
      <AotuBreadcrumbs/>
      <div className="flex justify-between mb-8 h-12">
        <div className="flex items-center space-x-3">
          <div className={`${isDark ? 'bg-[#252436] border-[#2A2A3C]' : 'bg-white'}  h-full flex items-center px-5 border rounded-lg`}>
            <Search />
            <input
              type="search"
              className={`${isDark ? 'bg-transparent text-white' : 'bg-white'} h-full outline-none pl-2 font-inter`}
              placeholder="Search..."
              onChange={onSearch}
            />
          </div>
          <button
            className="font-inter text-blue-600 h-full px-5 rounded-lg bg-blue-100"
            onClick={() => onSearch && onSearch()}
          >
            Search
          </button>
        </div>

        {path && (
          <Link
            to={path}
            className="font-inter bg-blue-100 text-blue-600 flex items-center px-5 rounded-xl"
          >
            add new
          </Link>
        )}
      </div>

      <div className="w-full">
        <div className={`${isDark ? 'border-[#2A2A3C]' : ''} border rounded-2xl p-5`}>
          <div className="flex justify-between items-center h-12 mb-8">
            <h2 className={`font-poppins font-bold text-xl ${isDark ? 'text-white' : ''}`}>
              {styles.title || "List"}
            </h2>

            <div className="flex h-full items-center space-x-3">
              <CustomSelect
                value={sortOption}
                onChange={(value) => {
                  setSortOption(value);
                  onSort?.(value);
                }}
                options={sortOptions}
                placeholder="مرتب‌سازی بر اساس..."
                className="min-w-[200px]"
              />

              <span
                className={`bg-blue-100 h-full w-12 text-blue-600 flex items-center rounded-lg justify-center 
                  ${viewMode === "card" ? "opacity-100" : "opacity-50"}`}
                onClick={() => onViewModeChange("card")}
              >
                <MdSpaceDashboard style={{ fontSize: "1.6rem" }} />
              </span>
              <span
                className={`bg-blue-100 h-full w-12 text-blue-600 flex items-center rounded-lg justify-center 
                  ${viewMode === "table" ? "opacity-100" : "opacity-50"}`}
                onClick={() => onViewModeChange("table")}
              >
                <FaList style={{ fontSize: "1.6rem" }} />
              </span>
            </div>
          </div>

          {renderView()}
        </div>
      </div>
    </section>
  );
}