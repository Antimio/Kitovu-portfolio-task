import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReposList() {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(10);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/Antimio/repos');
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterTerm(e.target.value);

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    repo.language?.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">GitHub Repositories</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Filter by language..."
          value={filterTerm}
          onChange={handleFilterChange}
          className="border p-2"
        />
      </div>
      <ul>
        {currentRepos.map(repo => (
          <li key={repo.id} className="mb-2">
            <Link to={`/repo/${repo.owner.login}/${repo.name}`} className="text-blue-500">
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={filteredRepos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

function Pagination({ reposPerPage, totalRepos, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex">
        {pageNumbers.map(number => (
          <li key={number} className={`mr-1 ${currentPage === number ? 'font-bold' : ''}`}>
            <button onClick={() => paginate(number)} className="border p-2">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ReposList;