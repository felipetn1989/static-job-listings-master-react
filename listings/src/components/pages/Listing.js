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
    <main>
      {jobs.map((job) => (
        <div key={job.id}>
          <img src={job.logo} alt={`${job.company} logo`} />
          <div className="flex">
            <h1>{job.company}</h1>
            {job.new && <span className="uppercase">new</span>}
            {job.featured && <span className="uppercase">featured</span>}
          </div>
          <p>{job.position}</p>
          <div>
            <span>{job.postedAt}</span>
            <span>{job.contract}</span>
            <span>{job.location}</span>
          </div>
          <span>{job.role}</span>
          <span>{job.level}</span>
          {job.languages.map((language) => (
            <span>{language}</span>
          ))}
          {job.tools.length !== 0 && job.tools.map((tool) => (
            <span>{tool}</span>
          ))}
        </div>
      ))}
    </main>
  );
}
