import UserModel from '../models/UserModel';
import FileModel from '../models/FileModel';
import FolderModel from '../models/FolderModel';
import ChatModel from '../models/ChatModel';

let appData = null;

export const loadAllData = async () => {
  if (appData) {
    return appData;
  }

  try {
    // Using dynamic import to handle JSON as a module
    const data = await import('../databases/data.json');
    
    appData = {
      users: (data.users || []).map(user => UserModel.fromJson(user)),
      files: (data.files || []).map(file => FileModel.fromJson(file)),
      folders: (data.folders || []).map(folder => FolderModel.fromJson(folder)),
      chats: (data.chats || []).map(chat => ChatModel.fromJson(chat))
    };

    return appData;
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      users: [],
      files: [],
      folders: [],
      chats: []
    };
  }
};

export const searchData = (query, data) => {
  if (!query.trim()) {
    return data;
  }

  const searchTerm = query.toLowerCase();
  
  return {
    users: data.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      (user.email && user.email.toLowerCase().includes(searchTerm))
    ),
    files: data.files.filter(file => 
      file.name.toLowerCase().includes(searchTerm) ||
      (file.path && file.path.toLowerCase().includes(searchTerm))
    ),
    folders: data.folders.filter(folder => 
      folder.name.toLowerCase().includes(searchTerm) ||
      (folder.path && folder.path.toLowerCase().includes(searchTerm))
    ),
    chats: data.chats.filter(chat => 
      chat.name.toLowerCase().includes(searchTerm) ||
      (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchTerm))
    )
  };
};
