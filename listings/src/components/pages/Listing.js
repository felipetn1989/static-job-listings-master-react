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
    <main className="grid pt-14 px-6 bg-[#effafa]">
      {jobs.map((job) => (
        <div key={job.id} className="relative bg-white rounded-lg">
          {job.featured && <div className="absolute h-full w-1 bg-[#5ba4a4] rounded-l-lg"></div>}
          <img className="w-12" src={job.logo} alt={`${job.company} logo`} />
          <div className="flex">
            <h1>{job.company}</h1>
            {job.new && <span className="uppercase">new</span>}
            {job.featured && <span className="uppercase">featured</span>}
          </div>
          <p className="text-[#2c3a3a]">{job.position}</p>
          <div>
            <span>{job.postedAt}</span>
            <span>{job.contract}</span>
            <span>{job.location}</span>
          </div>
          <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold">
            {job.role}
          </span>
          <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold">
            {job.level}
          </span>
          {job.languages.map((language) => (
            <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold">
              {language}
            </span>
          ))}
          {job.tools &&
            job.tools.map((tool) => (
              <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold">
                {tool}
              </span>
            ))}
        </div>
      ))}
    </main>
  );
}
