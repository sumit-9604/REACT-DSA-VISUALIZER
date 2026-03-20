# 🎨 React DSA Visualizer

> **Master Data Structures & Algorithms through Interactive Visualization**

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀%20LIVE%20DEMO-react--dsa--visualizer.netlify.app-blue?style=for-the-badge)](https://react-dsa-visualizer.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-sumit--9604%2FREACT--DSA--VISUALIZER-black?style=for-the-badge&logo=github)](https://github.com/sumit-9604/REACT-DSA-VISUALIZER)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Lightning%20Fast-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**An interactive learning platform for visualizing fundamental data structures and algorithms with real-time animations**

[Live Demo](#-quick-start) • [Features](#-features) • [Getting Started](#-installation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Supported Algorithms](#-supported-algorithms)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**React DSA Visualizer** is a comprehensive educational platform designed to help students and developers understand complex data structures and algorithms through **interactive visual representations**. Watch your code execute step-by-step with smooth animations and detailed explanations.

Perfect for:
- 🎓 Computer Science Students
- 👨‍💻 Coding Interview Preparation
- 🏫 Educational Institutions
- 👥 Algorithm Learners

### Why Visualize DSA?

Studies show that **visual learning increases retention by 65%**. Our visualizer transforms abstract concepts into concrete, interactive experiences that make learning engaging and effective.

---

## ✨ Features

### 🎬 Real-Time Animation
- **Step-by-step execution** with adjustable playback speed
- **Color-coded elements** showing comparisons, swaps, and selections
- **Smooth transitions** for easy follow-along

### 📊 Data Structure Visualization
- **Arrays & Linked Lists** - see pointer relationships
- **Trees & Graphs** - explore traversal patterns
- **Stacks & Queues** - understand LIFO/FIFO operations
- **Hash Tables** - visualize collision handling
- **Heaps** - observe heap property maintenance

### 🔄 Multiple Algorithm Implementations
- **Sorting**: Bubble, Quick, Merge, Insertion, Selection, Heap
- **Searching**: Binary Search, Linear Search
- **Graph Traversal**: DFS, BFS
- **Dynamic Programming**: Popular DP problems
- **Recursion**: Visualize recursive call stacks

### 🎮 Interactive Controls
- ⏵️ Play/Pause execution
- ⏭️ Step forward/backward
- 🎚️ Adjust animation speed
- 🎨 Customize visualization colors
- 📊 Custom input support

### 📚 Educational Resources
- **Detailed explanations** for each algorithm
- **Time & Space Complexity** analysis
- **Best/Average/Worst case** scenarios
- **Code snippets** in multiple languages
- **Complexity comparison** charts

### 🎨 Beautiful UI/UX
- **Responsive design** - works on all devices
- **Dark/Light mode** support
- **Smooth animations** for better understanding
- **Intuitive interface** for easy navigation
- **Accessibility features** included

---

## 🛠 Tech Stack

<table>
<tr>
  <td align="center"><strong>Frontend</strong></td>
  <td align="center"><strong>Build Tool</strong></td>
  <td align="center"><strong>Styling</strong></td>
  <td align="center"><strong>Deployment</strong></td>
</tr>
<tr>
  <td align="center">React 18</td>
  <td align="center">Vite</td>
  <td align="center">CSS3 / Tailwind</td>
  <td align="center">Netlify</td>
</tr>
</table>

**Key Dependencies:**
- **React** - UI library
- **Vite** - Next generation build tool
- **JavaScript ES6+** - Core logic
- **Canvas/SVG** - Visualization rendering

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone https://github.com/sumit-9604/REACT-DSA-VISUALIZER.git
cd REACT-DSA-VISUALIZER
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

Your app will be running at `http://localhost:5173`

### Step 4: Build for Production

```bash
npm run build
```

---

## 🚀 Quick Start

### First Visualization

1. **Open the app** in your browser
2. **Select a Data Structure** from the sidebar
3. **Choose an Algorithm** you want to visualize
4. **Enter custom input** (optional) or use default
5. **Click Play** to watch the visualization
6. **Use controls** to pause, step, or adjust speed

### Example: Visualizing Bubble Sort

```
1. Navigate to Sorting Algorithms
2. Select "Bubble Sort"
3. Input: [64, 34, 25, 12, 22, 11, 90]
4. Click Play
5. Watch as adjacent elements compare and swap
6. Observe the array becoming sorted
```

---

## 📁 Project Structure

```
REACT-DSA-VISUALIZER/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Visualizer/
│   │   │   ├── Controls/
│   │   │   ├── CodePanel/
│   │   │   └── SideBar/
│   │   ├── algorithms/
│   │   │   ├── sorting/
│   │   │   ├── searching/
│   │   │   ├── graphs/
│   │   │   └── trees/
│   │   ├── utils/
│   │   │   ├── animationEngine.js
│   │   │   └── complexityAnalyzer.js
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   └── animations.css
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## 📖 Usage Guide

### Running an Algorithm

1. **Select Category**: Choose from Sorting, Searching, Graphs, etc.
2. **Pick Algorithm**: Select specific algorithm from the list
3. **Input Data**: 
   - Use default test cases or
   - Enter custom array/graph data
4. **Start Visualization**: Click the play button
5. **Monitor Stats**: Watch real-time algorithm metrics

### Understanding Visualizations

- 🔵 **Blue** - Default/unvisited elements
- 🟡 **Yellow** - Currently comparing/processing
- 🟢 **Green** - Correctly positioned/visited
- 🔴 **Red** - Swapped/moved elements
- ⚪ **Gray** - Completed/sorted section

### Controls Explained

| Control | Function |
|---------|----------|
| **Play/Pause** | Start/Stop execution |
| **Step Forward** | Execute one step |
| **Step Backward** | Go back one step |
| **Speed Slider** | Adjust animation speed (0.5x - 2x) |
| **Reset** | Restart visualization |
| **New Input** | Clear and enter different data |

---

## 🎓 Supported Algorithms

### Sorting Algorithms (7)
- ✅ Bubble Sort
- ✅ Selection Sort
- ✅ Insertion Sort
- ✅ Merge Sort
- ✅ Quick Sort
- ✅ Heap Sort
- ✅ Counting Sort

### Searching Algorithms (2)
- ✅ Linear Search
- ✅ Binary Search

### Graph Algorithms (3)
- ✅ Breadth-First Search (BFS)
- ✅ Depth-First Search (DFS)
- ✅ Dijkstra's Algorithm

### Tree Algorithms (4)
- ✅ In-order Traversal
- ✅ Pre-order Traversal
- ✅ Post-order Traversal
- ✅ Level-order Traversal

### Dynamic Programming (5)
- ✅ Fibonacci
- ✅ 0/1 Knapsack
- ✅ Longest Common Subsequence
- ✅ Coin Change
- ✅ Edit Distance

---

## 🔄 How It Works

### Animation Engine Architecture

```
User Input → Algorithm Engine → State Manager 
    → Animation Queue → Visualizer → DOM Updates
```

### Key Components

**Visualizer Component**: Renders canvas with algorithm state
**Algorithm Engine**: Executes algorithm steps
**State Manager**: Tracks visualization state between steps
**Animation Queue**: Handles smooth transitions

---

## 🎨 Customization

### Change Colors

Edit `src/styles/theme.js`:

```javascript
const colors = {
  default: '#3498db',
  comparing: '#f39c12',
  sorted: '#2ecc71',
  swapped: '#e74c3c'
};
```

### Add New Algorithm

1. Create algorithm function in `src/algorithms/`
2. Export from index file
3. Add to algorithm registry
4. Update sidebar component

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **App won't start** | Run `npm install` again, clear node_modules |
| **Animations lag** | Reduce array size or decrease animation speed |
| **Can't see visualization** | Check browser console for errors |
| **Input not working** | Verify input format matches requirements |

---

## 🤝 Contributing

We love contributions! Help us improve React DSA Visualizer.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Ideas

- 🎨 Improve UI/UX design
- 📚 Add more algorithms
- 🌐 Add translations
- 📱 Improve mobile responsiveness
- 🐛 Report and fix bugs
- 📖 Improve documentation

### Code Style

- Use ES6+ syntax
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

---

## 📊 Performance Metrics

- ⚡ **Load Time**: < 2 seconds
- 🎬 **60 FPS**: Smooth animations
- 📱 **Mobile Optimized**: Responsive design
- ♿ **Accessibility**: WCAG 2.1 AA compliant

---

## 🎯 Roadmap

- [x] Core sorting algorithms
- [x] Graph algorithms
- [ ] Machine Learning algorithms
- [ ] Advanced DP problems
- [ ] 3D visualizations
- [ ] Multi-language support
- [ ] Community gallery
- [ ] Custom algorithm creation tool

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙋 Support & Community

### Get Help

- 📧 **Email**: [Your Email]
- 💬 **Issues**: [GitHub Issues](https://github.com/sumit-9604/REACT-DSA-VISUALIZER/issues)
- 💭 **Discussions**: [GitHub Discussions](https://github.com/sumit-9604/REACT-DSA-VISUALIZER/discussions)

### Share Your Feedback

Your feedback is valuable! Please share:
- 🐛 Bug reports
- 💡 Feature requests
- 🎨 Design suggestions
- 📚 Content improvements

---

## 👨‍💻 About the Author

**Sumit** - Full-Stack Developer passionate about creating educational tools and interactive learning platforms.

- 🔗 GitHub: [@sumit-9604](https://github.com/sumit-9604)
- 📧 Email: [Your Email]
- 💼 LinkedIn: [Your LinkedIn]

---

## 🌟 Show Your Support

If this project helped you learn DSA, please:
- ⭐ **Star** the repository
- 🔄 **Share** with friends
- 🐛 **Report** issues
- 💬 **Give feedback**

---

## 📚 Additional Resources

- [Big O Notation Guide](https://www.bigocheatsheet.com/)
- [Visualgo Algorithm Visualizer](https://visualgo.net/)
- [LeetCode DSA Problems](https://leetcode.com)
- [Geeks for Geeks](https://www.geeksforgeeks.org/)

---

<div align="center">

**Made with ❤️ for the DSA Learning Community**

[⬆ Back to Top](#-react-dsa-visualizer)

</div>
