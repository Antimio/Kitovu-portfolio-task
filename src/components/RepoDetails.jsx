import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RepoDetails() {
  const { owner, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
        setRepoDetails(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [owner, repo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repository details.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{repoDetails.name}</h1>
      <p>{repoDetails.description}</p>
      <p><strong>Language:</strong> {repoDetails.language}</p>
      <p><strong>Stars:</strong> {repoDetails.stargazers_count}</p>
      <p><strong>Forks:</strong> {repoDetails.forks_count}</p>
      <p><strong>Open Issues:</strong> {repoDetails.open_issues_count}</p>
      <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        View on GitHub
      </a>
    </div>
  );
}

export default RepoDetails;