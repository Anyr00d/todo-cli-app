# 🚀 Todo CLI

A simple, terminal-based task management tool built with **Node.js**, **Yargs**, and **Chalk**. Manage your tasks directly from the command line — add, list, complete, and delete tasks effortlessly!

## 🛠 Features

- Add new tasks
- List all tasks (with optional flags)
- Mark tasks as complete
- Delete tasks
- Handles invalid commands with helpful error messages

## 📂 Project Structure
```
todo-cli/  
├── index.js           # Main entry point  
├── commands/  
│   ├── add.js        # Add command logic  
│   ├── list.js       # List command logic  
│   ├── complete.js   # Complete command logic  
│   └── delete.js     # Delete command logic  
├── utils/  
│   ├── fileHandler.js  # File read/write functions  
│   └── timeHelper.js   # getTimeAgo function  
└── tasks.json         # Task storage

```

## 📦 Installation

1. **Clone the repository:**
```sh
git clone <repo-url>
cd <repo-folder>
```

2. **Install dependencies:**
```sh
npm install
```

3. **Link the CLI globally:**
```sh
npm link
```

## 🚀 Usage

Once linked, you can use the CLI with the `tasks` command:

### ➕ Add a Task
```sh
tasks add "Complete the project"
```

### 📋 List Tasks
```sh
tasks list
```

Show completed tasks:
```sh
tasks list --all
```

### ✅ Mark Task as Complete
```sh
tasks complete <task_id>
```

### 🗑 Delete a Task
```sh
tasks delete <task_id>
```

## 🛡 Error Handling
- Invalid commands show friendly error messages.
- Missing arguments prompt proper usage hints.

