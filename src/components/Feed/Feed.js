import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Feed/Feed.css';

const Feeds = () => {
    const [news, setNews] = useState([]);
    const [newFeedTitle, setNewFeedTitle] = useState('');
    const [newFeedDescription, setNewFeedDescription] = useState('');
    const [newFeedPubDate, setNewFeedPubDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.nasa.gov/news-release/feed/');
                const xmlText = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                const items = xmlDoc.querySelectorAll('item');

                const newsData = Array.from(items).map((item, index) => ({
                    id: index,
                    title: item.querySelector('title').textContent,
                    description: item.querySelector('description').textContent,
                    pubDate: item.querySelector('pubDate').textContent,
                    imageUrl: item.querySelector('enclosure')?.getAttribute('url') || '',
                }));

                setNews(newsData);
            } catch (error) {
                console.error('Error fetching NASA news:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleRemoveNews = (id) => {
        setNews((prevNews) => prevNews.filter((item) => item.id !== id));
    };

    const handleAddFeed = () => {
        if (newFeedTitle && newFeedDescription && newFeedPubDate) {
            const newFeed = {
                id: Date.now(),
                title: newFeedTitle,
                description: newFeedDescription,
                pubDate: newFeedPubDate,
            };

            setNews((prevNews) => [...prevNews, newFeed]);

            setNewFeedTitle('');
            setNewFeedDescription('');
            setNewFeedPubDate('');
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/');
    };

    return (
        <div className="feeds-container">
            <div className="logout-button" onClick={handleLogout}>
                Logout
            </div>
            <h2>NASA News</h2>
            <div className="feed-grid">
                {news.map((item) => (
                    <div key={item.id} className="feed-item">
                        <Link to={`/feeds/${item.id}`}>
                            <strong>{item.title}</strong>
                        </Link>
                        <p>{item.description}</p>
                        <p>{item.pubDate}</p>
                        <button onClick={() => handleRemoveNews(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="add-feed">
                <h3>Add Feed</h3>
                <input
                    type="text"
                    placeholder="Enter Feed Title"
                    value={newFeedTitle}
                    onChange={(e) => setNewFeedTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Feed Description"
                    value={newFeedDescription}
                    onChange={(e) => setNewFeedDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Feed PubDate"
                    value={newFeedPubDate}
                    onChange={(e) => setNewFeedPubDate(e.target.value)}
                />
                <button onClick={handleAddFeed}>Add</button>
            </div>
        </div>
    );
};

export default Feeds;
