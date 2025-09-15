import React, { createContext, useContext, useState, useEffect } from "react";
import * as dataService from "../services/dataService";
import UserModel from "../models/UserModel";
import FileModel from "../models/FileModel";
import FolderModel from "../models/FolderModel";
import ChatModel from "../models/ChatModel";
import AttachmentIcon from "../assets/images/file-icon.svg?react";
import PersonIcon from "../assets/images/user-icon.svg?react";
import ChatIcon from "../assets/images/chat-icon.svg?react";
import ListIcon from "../assets/images/list-icon.svg?react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState({
    users: [],
    files: [],
    folders: [],
    chats: [],
  });
  const [filteredData, setFilteredData] = useState({
    users: [],
    files: [],
    folders: [],
    chats: [],
  });

  const [tabs, setTabs] = useState([
    { name: "All", key: "all", active: true },
    { name: "Files", key: FileModel.type, icon: AttachmentIcon, active: true },
    { name: "People", key: UserModel.type, icon: PersonIcon, active: true },
    { name: "Chats", key: ChatModel.type, icon: ChatIcon, active: true },
    { name: "Lists", key: FolderModel.type, icon: ListIcon, active: true },
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedData = await dataService.loadAllData();

        setData(loadedData);
        setFilteredData(loadedData); // Initialize filtered data with all data
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [loading]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filterItems = (items) =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.email && item.email.toLowerCase().includes(query)) ||
          (item.lastMessage && item.lastMessage.toLowerCase().includes(query))
      );

    setFilteredData({
      users: filterItems(data.users),
      files: filterItems(data.files),
      folders: filterItems(data.folders),
      chats: filterItems(data.chats),
    });
  }, [searchQuery, data]);

  const getCurrentData = () => {
    if (activeTab === "all") {
      return [
        ...filteredData.users,
        ...filteredData.files,
        ...filteredData.folders,
        ...filteredData.chats,
      ];
    }
    return filteredData[`${activeTab}s`] || [];
  };

  const getCount = (type) => {
    if (type === "all") {
      return (
        filteredData.users.length +
        filteredData.files.length +
        filteredData.folders.length +
        filteredData.chats.length
      );
    }
    return (filteredData[`${type}s`] || []).length;
  };

  const value = {
    loading,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredData: getCurrentData(),
    getDataByType: (type) => filteredData[`${type}s`] || [],
    getCount,
    tabs,
    setTabs,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AppContext.Provider>
  );
};

export default AppContext;
