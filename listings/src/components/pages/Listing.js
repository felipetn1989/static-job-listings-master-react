import { useEffect, useState } from "react";

import FilterBox from "./FilterBox";

export default function Listing() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filterTags, setFilterTags] = useState([]);

  async function fetchData() {
    try {
      const resp = await fetch("https://api.npoint.io/8162247b84ab695d6a5e", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setJobs(data);
      setAllJobs(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterJobs(e) {
    const filter = e.target.innerText;

    if (!filterTags.includes(filter)) {
      setFilterTags([...filterTags, e.target.innerText]);
    }
  }

  function clearAllFilters() {
    setJobs(allJobs);
    setFilterTags([]);
  }

  function removeFilter(tagName) {
    setFilterTags(filterTags.filter((tag) => tag !== tagName));
  }

  useEffect(
    () =>
      setJobs(
        allJobs.filter((job) =>
          filterTags.every((tag) =>
            [job.role, job.level, ...job.languages, ...job.tools].includes(tag)
          )
        )
      ),
    [filterTags, allJobs]
  );

  return (
    <main className="grid gap-10 pt-14 px-6 mb-8 bg-[#effafa] lg:gap-[0.3125rem]">
      {filterTags.length > 0 && (
        <FilterBox
          tags={filterTags}
          clearAll={clearAllFilters}
          clearFilter={removeFilter}
        />
      )}
      {jobs.map((job) => (
        <div
          key={job.id}
          className="relative grid gap-2.5 bg-white rounded-lg pt-8 pb-6 px-6 shadow-md lg:w-[90%] lg:max-w-[69.5rem] lg:m-auto lg:flex lg:justify-between lg:items-center lg:mt-5 lg:px-4 lg:py-7"
        >
          {job.featured && (
            <div className="absolute h-full top-0 left-0 w-1 bg-[#5ba4a4] rounded-l-lg lg:w-1.5"></div>
          )}
          <div className="lg:flex lg:items-center lg:gap-12">
            <img
              className="absolute top-[-1.5rem] left-6 w-12 lg:relative lg:w-[5.5rem] lg:top-[unset]"
              src={job.logo}
              alt={`${job.company} logo`}
            />
            <div className="grid gap-2.5 lg:gap-2">
              <div className="flex gap-6 items-center lg:gap-5">
                <h1 className="text-[#5ba4a4] font-bold tracking-tight lg:text-lg">
                  {job.company}
                </h1>
                <div className="flex gap-2.5">
                  {job.new && (
                    <span className="uppercase bg-[#5ba4a4] text-white text-sm py-0.5 px-2 rounded-full">
                      new!
                    </span>
                  )}
                  {job.featured && (
                    <span className="uppercase bg-[#2c3a3a] text-white text-sm py-0.5 px-2 rounded-full">
                      featured
                    </span>
                  )}
                </div>
              </div>
              <p className="text-[#2c3a3a] font-bold tracking-tight hover:text-[#5ba4a4] hover:cursor-pointer lg:text-xl lg:tracking-wider">
                {job.position}
              </p>
              <div className="flex gap-2.5 items-center text-[#7b8e8e] mt-[-0.25rem] border-b border-[#7b8e8e] pb-4 lg:border-b-0 lg:pb-[unset] lg:text-lg lg:gap-[1.125rem] lg:mt-[-0.3125rem]">
                <span>{job.postedAt}</span>
                <div className="bg-[#7b8e8e] w-1 h-1 rounded-full"></div>
                <span>{job.contract}</span>
                <div className="bg-[#7b8e8e] w-1 h-1 rounded-full"></div>
                <span className="ml-[-0.25rem]">
                  {job.location.replace(/(?<=\s)\S/g, (match) =>
                    match.toLowerCase()
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-1.5 gap-x-[1.125rem] gap-y-4 lg:translate-x-[-1.3175rem] lg:mt-0">
            <span
              className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
              onClick={filterJobs}
            >
              {job.role}
            </span>
            <span
              className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
              onClick={filterJobs}
            >
              {job.level}
            </span>
            {job.languages.map((language, index) => (
              <span
                key={index}
                className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
                onClick={filterJobs}
              >
                {language}
              </span>
            ))}
            {job.tools &&
              job.tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
                  onClick={filterJobs}
                >
                  {tool}
                </span>
              ))}
          </div>
        </div>
      ))}
    </main>
  );
}
