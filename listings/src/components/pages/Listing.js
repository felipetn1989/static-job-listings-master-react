import { useEffect, useState } from "react";

export default function Listing() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

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

  return (
    <main className="grid gap-10 pt-14 px-6 bg-[#effafa]">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="relative grid gap-2.5 bg-white rounded-lg pt-8 pb-6 px-6 shadow-md"
        >
          {job.featured && (
            <div className="absolute h-full top-0 left-0 w-1 bg-[#5ba4a4] rounded-l-lg"></div>
          )}
          <img
            className="absolute top-[-1.5rem] left-6 w-12"
            src={job.logo}
            alt={`${job.company} logo`}
          />
          <div className="flex gap-6 items-center">
            <h1 className="text-[#5ba4a4] font-bold tracking-tight">
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
          <p className="text-[#2c3a3a]">{job.position}</p>
          <div className="flex gap-2.5 items-center text-[#7b8e8e] mt-[-0.25rem] border-b border-[#7b8e8e] pb-4">
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
          <div className="flex flex-wrap mt-1.5 gap-x-[1.125rem] gap-y-4">
            <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg">
              {job.role}
            </span>
            <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg">
              {job.level}
            </span>
            {job.languages.map((language) => (
              <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg">
                {language}
              </span>
            ))}
            {job.tools &&
              job.tools.map((tool) => (
                <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-lg">
                  {tool}
                </span>
              ))}
          </div>
        </div>
      ))}
    </main>
  );
}
