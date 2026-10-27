# Universal 2D Map Studio (`SAMapEditor2d`)

A standalone, browser-based visual 2D level editor designed for platformers, top-down tracks, and tile-based games (including Kenny Adventure, Turbo Drift 2D, and custom indie games). Built with pure vanilla HTML5, CSS3, and JavaScript Canvas — zero dependencies, zero build steps, and runs instantly in any modern browser.

---

## 🌟 Key Features

### 1. Unified Self-Describing Map Format Support
* **Works for Kenny Adventure (`64px`), Turbo Drift 2D (`128px`), and Any 2D Engine**:
  * Loads and exports maps in the standardized **Self-Describing Object Format**:
    1. **`name`**: Map title/stage label.
    2. **`tileSize`**: Automatic canvas scaling (`64px` for Kenny Adventure, `128px` for Turbo Drift 2D, etc.).
    3. **`assets`**: Complete dictionary mapping every character symbol directly to its sprite image filename.
    4. **`grid`**: 2D ASCII character array.
  * Exports both `window.CURRENT_LEVEL_MAP` and game aliases (`window.CURRENT_TURBO_MAP`).
  * Seamlessly falls back to older raw ASCII arrays or plain `.txt` files.
* **Instant Drag-and-Drop Map Loading**:
  * Drag any `.js` or `.txt` level file from your computer and drop it directly onto the editor canvas to load it immediately.

### 2. Universal Asset Scanner & Smart Categorization
* **Works for Every 2D Project**:
  * Select your project's sprite assets folder via file picker or directory drag-and-drop.
  * Recursively scans and discovers all 2D sprite images (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.gif`, `.bmp`).
* **Smart Asset Categorization**:
  * Automatically classifies discovered assets into categorized groups:
    * 🌱 **Terrain & Tiles**: ground, grass, dirt, stone, platforms, walls, roads, asphalt, tracks
    * 🦸 **Characters**: player, hero, cars, racers, idle, walk, run, avatars
    * 👾 **Enemies & Opponents**: slimes, bees, monsters, bosses, AI opponent cars
    * 💎 **Items & Collectibles**: coins, gems, hearts, stars, keys, powerups
    * ⚠️ **Hazards & Obstacles**: spikes, water, lava, traps, oil slicks, traffic cones, barrels, rocks
    * ⚙️ **Interactive & Mechanics**: springs, jump pads, flags, finish lines, checkpoints, doors, signs
    * 🌳 **Props & Scenery**: trees, bushes, clouds, hills, fences, decorations
    * 🌄 **Backgrounds**: sky, hills, clouds, parallax backgrounds
    * 📦 **General & Other**: custom game sprites
  * Preserves subfolder names as custom categories when subdirectories are used.
  * Shows category preview chips in the Setup Wizard for immediate visual feedback.

### 3. Tile Identifiers & Customization
* **Automatic Identifier Assignment**:
  * Every sprite receives a unique single-character identifier (`#`, `P`, `|`, `-`, `F`, `A`, `1`, etc.) for representing the tile in the ASCII grid and exported game modules.
  * Common game objects automatically receive intuitive default characters (`#` for ground, `P` for player spawn, `C` for coins, `S` for enemies, `|` / `-` for roads, etc.).
* **Customizable Identifiers**:
  * Click on any tile's `char-tag` badge in the palette to open the **🏷️ Customize Tile Identifier** dialog.
  * Type your preferred single character.
  * If the character is already assigned to another tile, the editor will gracefully swap identifiers.
  * All existing tiles on the canvas map using the old character are updated automatically (with full Undo/Redo history support).

### 4. Palette Navigation, Search & Category Filters
* **Category Filter Pills**: Quick-filter the palette by clicking category pills (e.g., `All (32)`, `🌱 Terrain (12)`, `👾 Enemies (4)`, `💎 Items (6)`).
* **Instant Search Bar**: Filter tiles in real time by name, category, or character identifier (`🔍 Search tiles...`).
* **Active Tile Ghost Preview**: Hovering over the canvas displays a live semi-transparent ghost preview of the selected tile.
* **Quick Erase & Void Tiles**:
  * Dedicated `[ . ] Clear / Ground` card to clear objects back to base ground.
  * Dedicated `[ ␣ ] Empty Void` card (`' '`) to delete ground tiles completely into void space.

### 5. Interactive Startup & Project Setup Wizard
* **Flexible Project Sources**:
  * **Load File**: Open existing `.js` or `.txt` map files (supports self-describing modules or raw ASCII).
  * **Level Presets**:
    * *Level 1: Sunny Meadow* (Kenny Adventure 64px - 100×12)
    * *Turbo Drift 2D: Default Circuit* (Racing 128px - 14×10)
    * *Level 2: Template* (64px - 100×12)
  * **New Blank Stage**: Generate custom-dimension stages (configure custom columns and rows).
  * **Paste Code**: Paste raw ASCII text, self-describing objects, or JavaScript arrays directly.
* **Configurable Tile Size**: Select 128×128 px (Turbo Drift / Large), 64×64 px (standard), 48×48 px, or 32×32 px.
* Switch projects or reload asset folders at any time via **⚙️ Project Setup / Files** in the top navigation bar.

### 6. Multi-Tool Editing Suite & Smart Erase
* ✏️ **Paint Tool (`P`)**: Place tiles individually or paint continuously by dragging.
* 📏 **Line Tool (`L`)**: Click and drag horizontally to draw platform rows or straight track strips with live bounding box preview.
* 🧹 **Smart Erase Tool (`E`) & Right-Click**:
  * **Erasing Objects / Roads**: Clicking erase on an object or road clears it back to ground (`.`).
  * **Erasing Ground (Void Deletion)**: Clicking erase on a ground tile (`.`) deletes it completely into empty void space (`' '`), which top-down engines like Turbo Drift 2D render as void/abyss.
  * **Restoring Void**: Clicking erase on void space toggles it back to base ground (`.`).
* ✋ **Move Tool (`M`)**: Click and drag any placed entity (player car/spawn, enemies, obstacles, items) to reposition it.
* 🧭 **Canvas Panning**: Hold `Space` + Left-Click Drag, or Middle-Click Drag to navigate large stages.
* 🔍 **Zoom & View Overlays**: Scale canvas between 25% and 125%; toggle grid lines and column coordinate rulers.
* ↺ **Undo / Redo**: 40-step history stack with `Ctrl+Z` / `Ctrl+Y` and toolbar buttons.

### 7. Reliable Save & Export Menu
* **Continuous Hover & Click Interaction**:
  * Hovering over **💾 Save Map ▾** opens the options menu smoothly without flickering.
  * Continuous hit area ensures moving the cursor to menu items never closes the menu prematurely.
  * Click to toggle, press `Escape` or click outside to dismiss.
* **Dual Format Export with Tile Legends**:
  * **📦 Save as .js (Game Module)**: Exports the unified **Self-Describing Map Format** declaring both `window.CURRENT_LEVEL_MAP` and `window.CURRENT_TURBO_MAP`.
  * **📄 Save as .txt (Raw ASCII)**: Clean text file containing the formatted ASCII character grid and an informative Tile Identifier Legend header.

### 8. Persistent Local Auto-Save & Crash Protection
* Every tile edit automatically persists to browser `localStorage` along with custom tile definitions.
* If you refresh or reload the browser tab, your work is preserved.
* The startup wizard detects previous drafts and surfaces a **↺ Resume Previous Session** button.

### 9. Bidirectional Live Code Drawer
* Click **📜 Map Code** to open the raw ASCII code drawer.
* The drawer continuously updates in real-time as you paint on the canvas.
* Edit or paste ASCII arrays directly into the drawer and click **Apply to Grid** for instant bidirectional sync.
* Click **📋 Copy Code** to quickly copy the array to the clipboard.

---

## 🕹️ Controls & Keyboard Shortcuts

| Action | Control / Shortcut |
| :--- | :--- |
| **Paint Tile** | Left-Click & Drag (or press `P`) |
| **Draw Platform Row / Line** | Left-Click & Drag horizontally (or press `L`) |
| **Erase Tile** | Right-Click anywhere **OR** Left-Click with Erase tool (`E`) |
| **Move Entity** | Click & Drag any entity with Move tool (`M`) |
| **Pan Canvas** | Hold `Space` + Left-Click Drag **OR** Middle-Click Drag |
| **Undo** | `Ctrl + Z` (or Undo button) |
| **Redo** | `Ctrl + Y` (or Redo button) |
| **Customize Tile Identifier** | Click any tile's `char-tag` badge in the palette |
| **Filter Palette** | Click category pills or type in search box |
| **Toggle Raw Code Drawer** | Click **📜 Map Code** |
| **Close Menus / Modals** | `Escape` key |

---

## 📄 Self-Describing Map Format Reference

### Example: Platformer Map (Kenny Adventure)
```javascript
window.CURRENT_LEVEL_MAP = {
    name: "Level 1: Sunny Meadow",
    tileSize: 64,
    assets: {
        '#': 'terrain_grass_block.png',
        'B': 'terrain_grass_block_center.png',
        '[': 'terrain_grass_horizontal_left.png',
        '=': 'terrain_grass_horizontal_middle.png',
        ']': 'terrain_grass_horizontal_right.png',
        '?': 'block_coin.png',
        '!': 'block_exclamation.png',
        'E': 'block_empty.png',
        '~': 'water_top.png',
        '^': 'spikes.png',
        'J': 'spring.png',
        'C': 'coin_gold.png',
        'G': 'gem_blue.png',
        'H': 'heart.png',
        'F': 'flag_green_a.png',
        'P': 'character_green_idle.png',
        'S': 'slime_normal_walk_a.png',
        'W': 'bee_a.png'
    },
    grid: [
/*  0 */ "....................................................................................................",
/*  8 */ "...P................S.............J...====..............S........J.........^^.....S....#########....",
/*  9 */ "######################################....##########################....############################",
/* 10 */ "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB~~~~BBBBBBBBBBBBBBBBBBBBBBBBBB~~~~BBBBBBBBBBBBBBBBBBBBBBBBBBBB"
    ]
};
```

### Example: Racing Map (Turbo Drift 2D)
```javascript
window.CURRENT_LEVEL_MAP = {
    name: "Default Circuit",
    tileSize: 128,
    assets: {
        '.': 'land_grass01.png',
        '|': 'road_asphalt01.png',
        '-': 'road_asphalt02.png',
        '1': 'road_asphalt03.png',
        '2': 'road_asphalt04.png',
        '3': 'road_asphalt05.png',
        '4': 'road_asphalt06.png',
        'F': 'road_asphalt07.png',
        'P': 'car.png',
        'A': 'car_red_1.png',
        'O': 'oil.png',
        'K': 'cone_down.png',
        'B': 'barrel_red.png',
        'R': 'rock1.png',
        'T': 'tree_small.png'
    },
    grid: [
/*  0 */ "..............",
/*  1 */ "..............",
/*  2 */ "..3--------4..",
/*  3 */ "..|........|..",
/*  4 */ "..|........|..",
/*  5 */ "..|....3-F-2..",
/*  6 */ "..|....|......",
/*  7 */ "..1----2......",
/*  8 */ "..............",
/*  9 */ ".............."
    ]
};
window.CURRENT_TURBO_MAP = window.CURRENT_LEVEL_MAP;
```

---

## 📁 Project Structure

```text
SAMapEditor2d/
├── index.html               # Main editor UI, palette sidebar, canvas viewport, and modals
├── editor.css               # Modern dark theme, palette search/pills, and modal styling
├── editor.js                # Core engine: self-describing parser, asset scanner, tile registry
├── Level_1_SunnyMeadow.txt  # Sample 100x12 ASCII platformer map file
└── README.md                # Project documentation and guide
```

---

## 🚀 Getting Started

1. **Open the Editor**:
   * Double-click [index.html](file:///c:/Users/Dev%20Acc/Documents/GitHub/SAMapEditor2d/index.html) to open directly in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.
   * Or serve via any local HTTP server:
     ```bash
     npx serve .
     # or
     python -m http.server 8000
     ```

2. **Load Your Game Assets & Maps**:
   * In Step 1 of the Startup Wizard, browse your sprite folder or drop your assets directory.
   * In Step 2, select an existing map file, pick a preset (Kenny Adventure or Turbo Drift 2D), or drag-and-drop a `.js` map file onto the window.
   * The editor reads the `tileSize` (`64px` or `128px`), registers all `assets`, loads the `grid`, and populates the palette!
