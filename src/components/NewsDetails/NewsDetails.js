import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../NewsDetails/NewsDetails.css"
const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const response = await fetch('https://www.nasa.gov/news-release/feed/');
                const xmlText = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                const items = xmlDoc.querySelectorAll('item');

                const selectedNewsItem = Array.from(items).find((item, index) => index === parseInt(id, 10));

                if (selectedNewsItem) {
                    const newsData = {
                        title: selectedNewsItem.querySelector('title').textContent,
                        description: selectedNewsItem.querySelector('description').textContent,
                        pubDate: selectedNewsItem.querySelector('pubDate').textContent,
                        link: selectedNewsItem.querySelector('link').textContent,
                        guid: selectedNewsItem.querySelector('guid').textContent,
                        category: selectedNewsItem.querySelector('category').textContent,
                    };

                    setNewsItem(newsData);
                }
            } catch (error) {
                console.error('Error fetching NASA news:', error.message);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (!newsItem) {
        return <p>Loading...</p>;
    }
    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/');
    };

    return (
        <div className="news-detail-container">
            <div className="logout-button" onClick={handleLogout}>
                Logout
            </div>
            <h2>{newsItem.title}</h2>
            <p>{newsItem.pubDate}</p>
            <p>{newsItem.description}</p>
            <p>Link: <a href={newsItem.link} target="_blank" rel="noopener noreferrer">{newsItem.link}</a></p>
            <p>GUID: {newsItem.guid}</p>
            <p>Category: {newsItem.category}</p>
        </div>
    );

};

export default NewsDetail;
