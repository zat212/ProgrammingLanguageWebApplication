import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CodeOutlined,
  BookOutlined,
  ReadOutlined,
  TrophyOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const menuItems = [
  {
    key: 'java',
    icon: <CodeOutlined />,
    label: 'Java',
    children: [
      {
        key: 'java-lessons',
        icon: <BookOutlined />,
        label: 'Lessons',
        children: [
          {
            key: 'java-beginner',
            label: <Link to="/javaBasic">Beginner</Link>,
          },
          {
            key: 'java-intermediate',
            label: <Link to="/javaInter">Intermediate</Link>,
          },
          {
            key: 'java-advanced',
            label: <Link to="/javaAdvance">Advanced</Link>,
          },
        ],
      },
      {
        key: 'java-quizzes',
        icon: <ReadOutlined />,
        label: <Link to="/javaStartGame">Let's Play</Link>,
      },
      {
        key: 'java-leaderboard',
        icon: <TrophyOutlined />,
        label: <Link to="/javaLeaderBoard">Leaderboard</Link>,
      },
      {
        key: 'java-saved',
        icon: <SaveOutlined />,
        label: <Link to="/javaSavedLesson">Saved Lessons</Link>,
      },
    ],
  },
  {
    key: 'python',
    icon: <CodeOutlined />,
    label: 'Python',
    children: [
      {
        key: 'python-lessons',
        icon: <BookOutlined />,
        label: 'Lessons',
        children: [
          {
            key: 'python-beginner',
            label: <Link to="/pythonBeginner">Beginner</Link>,
          },
          {
            key: 'python-intermediate',
            label: <Link to="/pytonInter">Intermediate</Link>,
          },
          {
            key: 'python-advanced',
            label: <Link to="/pythonAdvance">Advanced</Link>,
          },
        ],
      },
      {
        key: 'python-quizzes',
        icon: <ReadOutlined />,
        label: <Link to="/pythonGamepage">Let's Play</Link>,
      },
      {
        key: 'python-leaderboard',
        icon: <TrophyOutlined />,
        label: <Link to="/pythonLeaderBoard">Leaderboard</Link>,
      },
      {
        key: 'python-saved',
        icon: <SaveOutlined />,
        label: <Link to="/pythonSaved">Saved Lessons</Link>,
      },
    ],
  },
  {
    key: 'javascript',
    icon: <CodeOutlined />,
    label: 'JavaScript',
    children: [
      {
        key: 'js-lessons',
        icon: <BookOutlined />,
        label: 'Lessons',
        children: [
          {
            key: 'js-beginner',
            label: <Link to="/javaScriptBeginner">Beginner</Link>,
          },
          {
            key: 'js-intermediate',
            label: <Link to="/javaScriptInter">Intermediate</Link>,
          },
          {
            key: 'js-advanced',
            label: <Link to="/javaScriptAdvance">Advanced</Link>,
          },
        ],
      },
      {
        key: 'js-quizzes',
        icon: <ReadOutlined />,
        label: <Link to="/javaScriptGame">Let's Play</Link>,
      },
      {
        key: 'js-leaderboard',
        icon: <TrophyOutlined />,
        label: <Link to="/javaScriptLeaderBoard">Leaderboard</Link>,
      },
      {
        key: 'js-saved',
        icon: <SaveOutlined />,
        label: <Link to="/javaScriptSaved">Saved Lessons</Link>,
      },
    ],
  },
];

const getLevelKeys = (items) => {
  const levels = {};
  const traverse = (list, level = 1) => {
    list.forEach((item) => {
      if (item.key) levels[item.key] = level;
      if (item.children) traverse(item.children, level + 1);
    });
  };
  traverse(items);
  return levels;
};

const levelKeys = getLevelKeys(menuItems);

// Sidebar Component
const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(['java', 'java-lessons']);

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));

    if (latestOpenKey) {
      const sameLevelSiblingIndex = keys
        .filter((key) => key !== latestOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[latestOpenKey]);

      setOpenKeys(
        keys
          .filter((_, index) => index !== sameLevelSiblingIndex)
          .filter((key) => levelKeys[key] <= levelKeys[latestOpenKey])
      );
    } else {
      setOpenKeys(keys);
    }
  };

  return (
    <div className="fixed top-[70px] left-0 w-64 h-[700px] pt-10 rounded-[24px] bg-white shadow">
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ border: 'none', height: '100%' }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
