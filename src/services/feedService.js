const LOCAL_STORAGE_KEY = 'feeds';

const getFeeds = () => {
    const feedsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    return feedsJSON ? JSON.parse(feedsJSON) : [];
};

const addFeed = (url) => {
    const feeds = getFeeds();
    feeds.push({ id: Date.now(), url });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feeds));
};

const removeFeed = (id) => {
    const feeds = getFeeds();
    const updatedFeeds = feeds.filter(feed => feed.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFeeds));
};

export default {
    getFeeds,
    addFeed,
    removeFeed,
};
