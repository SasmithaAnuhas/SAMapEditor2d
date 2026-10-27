/**
 * UNIVERSAL 2D MAP STUDIO - Platformer & Tilemap Level Editor
 * Unified Self-Describing Map Format (tileSize, assets dictionary, grid),
 * Dynamic 2D Asset Scanner, Smart Categorization, Tile Identifier Manager,
 * Bidirectional Code Drawer, Persistent Local Auto-Save.
 */

// ==========================================
// 1. CONFIGURATION & PRESETS
// ==========================================
const DEFAULT_ASSET_BASE = '../../Games/KennyAdventureV1/Assets/kenney_new-platformer-pack-1.1/';
let TILE_SIZE = 64;

// Default Level 1 (Sunny Meadow) Grid
const PRESET_LEVEL_1 = [
/*  0 */ "....................................................................................................",
/*  1 */ "....................................................................................................",
/*  2 */ ".................................CGC.............................CHC................................",
/*  3 */ "................................[===]...........................[===]...............................",
/*  4 */ "................................................W...............G...........W.......................",
/*  5 */ ".......................CGC....................................[===]........CC...............CCF.....",
/*  6 */ ".............C........[===].....................?CC.........!.............[==].............#####....",
/*  7 */ ".......CCC..[?=].[==].........................[=====]...............[==].................#######....",
/*  8 */ "...P................S.............J...====..............S........J.........^^.....S....#########....",
/*  9 */ "######################################....##########################....############################",
/* 10 */ "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB~~~~BBBBBBBBBBBBBBBBBBBBBBBBBB~~~~BBBBBBBBBBBBBBBBBBBBBBBBBBBB",
/* 11 */ "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB~~~~BBBBBBBBBBBBBBBBBBBBBBBBBB~~~~BBBBBBBBBBBBBBBBBBBBBBBBBBBB"
];

// Level 2 Template
const PRESET_LEVEL_2 = [
/*  0 */ "....................................................................................................",
/*  1 */ "....................................................................................................",
/*  2 */ "....................................................................................................",
/*  3 */ "....................................................................................................",
/*  4 */ "....................................................................................................",
/*  5 */ "....................................................................................................",
/*  6 */ "............................................................................................#####...",
/*  7 */ "..........................................................................................#######...",
/*  8 */ "...P....................................................................................#########...",
/*  9 */ "####################################################################################################",
/* 10 */ "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
/* 11 */ "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
];

// Unified Self-Describing Preset: Kenny Adventure Level 1
const PRESET_KENNY_LEVEL_1 = {
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
        'W': 'bee_a.png',
        '>': 'sign_right.png',
        'X': 'sign_exit.png'
    },
    grid: PRESET_LEVEL_1
};

// Unified Self-Describing Preset: Turbo Drift 2D Default Circuit
const PRESET_TURBO_DRIFT = {
    name: "Default Circuit",
    tileSize: 128,
    assets: {
        '.': 'land_grass01.png',      // Grass field
        '|': 'road_asphalt01.png',     // Vertical straight road
        '-': 'road_asphalt02.png',     // Horizontal straight road
        '1': 'road_asphalt03.png',     // Corner bottom-left (⌞)
        '2': 'road_asphalt04.png',     // Corner bottom-right (⌟)
        '3': 'road_asphalt05.png',     // Corner top-left (⌜)
        '4': 'road_asphalt06.png',     // Corner top-right (⌝)
        'F': 'road_asphalt07.png',     // Start / Finish line
        'P': 'car.png',                // Player car spawn
        'A': 'car_red_1.png',          // AI opponent spawn
        'O': 'oil.png',                // Oil slick hazard
        'K': 'cone_down.png',          // Traffic cone
        'B': 'barrel_red.png',         // Red barrel obstacle
        'R': 'rock1.png',              // Rock obstacle
        'T': 'tree_small.png'          // Small tree
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

// Default Kenny Preset Mappings for Backwards Compatibility
const KENNEY_PRESET_MAP = {
    'terrain_grass_block.png': '#',
    'terrain_grass_block_center.png': 'B',
    'terrain_grass_horizontal_left.png': '[',
    'terrain_grass_horizontal_middle.png': '=',
    'terrain_grass_horizontal_right.png': ']',
    'block_coin.png': '?',
    'block_exclamation.png': '!',
    'block_empty.png': 'E',
    'water_top.png': '~',
    'spikes.png': '^',
    'spring.png': 'J',
    'coin_gold.png': 'C',
    'gem_blue.png': 'G',
    'heart.png': 'H',
    'flag_green_a.png': 'F',
    'character_green_idle.png': 'P',
    'slime_normal_walk_a.png': 'S',
    'bee_a.png': 'W',
    'sign_right.png': '>',
    'sign_exit.png': 'X'
};

const RELATIVE_ASSET_PATHS = {
    'terrain_grass_block.png': 'Sprites/Tiles/Default/terrain_grass_block.png',
    'terrain_grass_block_center.png': 'Sprites/Tiles/Default/terrain_grass_block_center.png',
    'terrain_grass_horizontal_left.png': 'Sprites/Tiles/Default/terrain_grass_horizontal_left.png',
    'terrain_grass_horizontal_middle.png': 'Sprites/Tiles/Default/terrain_grass_horizontal_middle.png',
    'terrain_grass_horizontal_right.png': 'Sprites/Tiles/Default/terrain_grass_horizontal_right.png',
    'block_coin.png': 'Sprites/Tiles/Default/block_coin.png',
    'block_exclamation.png': 'Sprites/Tiles/Default/block_exclamation.png',
    'block_empty.png': 'Sprites/Tiles/Default/block_empty.png',
    'water_top.png': 'Sprites/Tiles/Default/water_top.png',
    'spikes.png': 'Sprites/Tiles/Default/spikes.png',
    'spring.png': 'Sprites/Tiles/Default/spring.png',
    'coin_gold.png': 'Sprites/Tiles/Default/coin_gold.png',
    'gem_blue.png': 'Sprites/Tiles/Default/gem_blue.png',
    'heart.png': 'Sprites/Tiles/Default/heart.png',
    'flag_green_a.png': 'Sprites/Tiles/Default/flag_green_a.png',
    'character_green_idle.png': 'Sprites/Characters/Default/character_green_idle.png',
    'slime_normal_walk_a.png': 'Sprites/Enemies/Default/slime_normal_walk_a.png',
    'bee_a.png': 'Sprites/Enemies/Default/bee_a.png',
    'background_solid_sky.png': 'Sprites/Backgrounds/Default/background_solid_sky.png',
    'background_color_hills.png': 'Sprites/Backgrounds/Default/background_color_hills.png',
    'background_clouds.png': 'Sprites/Backgrounds/Default/background_clouds.png'
};

const FALLBACK_COLORS = {
    '#': '#40d17a', 'B': '#8b5a2b', '[': '#40d17a', '=': '#40d17a', ']': '#40d17a',
    '?': '#ffd700', '!': '#ff4757', 'E': '#718093', '~': '#00a8ff', '^': '#e84118',
    'J': '#3ea6ff', 'C': '#ffd700', 'G': '#00d2ff', 'H': '#ff4757', 'F': '#2ed573',
    'P': '#2ed573', 'S': '#4cd137', 'W': '#fbc531', '>': '#f39c12', 'X': '#c0392b',
    '|': '#34495e', '-': '#34495e', '1': '#2c3e50', '2': '#2c3e50', '3': '#2c3e50',
    '4': '#2c3e50', 'A': '#e74c3c', 'O': '#1e272e', 'K': '#e67e22', 'R': '#7f8c8d',
    'T': '#27ae60'
};

// ==========================================
// 2. DYNAMIC CATEGORIZATION & TILE REGISTRY
// ==========================================

const CATEGORY_DEFINITIONS = [
    {
        id: 'terrain',
        name: 'Terrain & Tiles',
        icon: '🌱',
        keywords: ['terrain', 'tile', 'tiles', 'ground', 'grass', 'dirt', 'stone', 'rock', 'sand', 'snow', 'block', 'wall', 'platform', 'floor', 'brick', 'wood', 'bridge', 'road', 'asphalt', 'track', 'land']
    },
    {
        id: 'characters',
        name: 'Characters',
        icon: '🦸',
        keywords: ['character', 'characters', 'player', 'hero', 'actor', 'avatar', 'protagonist', 'idle', 'walk', 'run', 'jump', 'fall', 'duck', 'kenny', 'p1', 'p2', 'car', 'vehicle', 'racer']
    },
    {
        id: 'enemies',
        name: 'Enemies & Opponents',
        icon: '👾',
        keywords: ['enemy', 'enemies', 'monster', 'slime', 'bee', 'wasp', 'fly', 'spider', 'bat', 'baddie', 'creature', 'boss', 'mob', 'zombie', 'skeleton', 'ghost', 'walker', 'opponent', 'ai']
    },
    {
        id: 'items',
        name: 'Items & Collectibles',
        icon: '💎',
        keywords: ['coin', 'gem', 'heart', 'star', 'diamond', 'item', 'items', 'collect', 'pickup', 'powerup', 'key', 'potion', 'crystal', 'chest', 'ring', 'loot', 'gold']
    },
    {
        id: 'hazards',
        name: 'Hazards & Obstacles',
        icon: '⚠️',
        keywords: ['hazard', 'hazards', 'spike', 'trap', 'traps', 'water', 'lava', 'acid', 'fire', 'saw', 'blade', 'laser', 'thorn', 'mine', 'bomb', 'damage', 'oil', 'cone', 'barrel', 'barrier']
    },
    {
        id: 'mechanics',
        name: 'Interactive & Mechanics',
        icon: '⚙️',
        keywords: ['spring', 'pad', 'flag', 'checkpoint', 'goal', 'finish', 'door', 'gate', 'switch', 'lever', 'button', 'ladder', 'box', 'block_coin', 'block_empty', 'exclamation', 'mystery', 'sign', 'light']
    },
    {
        id: 'props',
        name: 'Props & Scenery',
        icon: '🌳',
        keywords: ['prop', 'props', 'tree', 'bush', 'plant', 'flower', 'cloud', 'hill', 'mountain', 'fence', 'sign', 'foliage', 'lamp', 'torch', 'deco', 'scenery', 'detail', 'rock']
    },
    {
        id: 'backgrounds',
        name: 'Backgrounds',
        icon: '🌄',
        keywords: ['background', 'backgrounds', 'bg', 'sky', 'parallax']
    },
    {
        id: 'general',
        name: 'General & Other',
        icon: '📦',
        keywords: []
    }
];

function classifyAsset(filename, relPath = '') {
    const combinedPath = `${relPath.toLowerCase()}/${filename.toLowerCase()}`;
    const pathSegments = relPath.toLowerCase().split(/[/\\]/);

    // 1. Check folder segments for category keywords
    for (const cat of CATEGORY_DEFINITIONS) {
        if (cat.id === 'general') continue;
        for (const kw of cat.keywords) {
            for (const seg of pathSegments) {
                if (seg === kw || seg === kw + 's' || seg.startsWith(kw + '_') || seg.includes(kw)) {
                    return cat;
                }
            }
        }
    }

    // 2. Check filename keywords
    const baseName = filename.toLowerCase().replace(/\.[^/.]+$/, '');
    for (const cat of CATEGORY_DEFINITIONS) {
        if (cat.id === 'general') continue;
        for (const kw of cat.keywords) {
            if (baseName.includes(kw)) {
                return cat;
            }
        }
    }

    // 3. Fallback: use folder name if available
    if (pathSegments.length > 1) {
        const folder = pathSegments[pathSegments.length - 2];
        if (folder && folder !== '.' && folder.length > 1) {
            return {
                id: folder.replace(/[^a-z0-9]/gi, '_').toLowerCase(),
                name: folder.charAt(0).toUpperCase() + folder.slice(1),
                icon: '📁',
                keywords: []
            };
        }
    }

    return CATEGORY_DEFINITIONS.find(c => c.id === 'general');
}

function formatSpriteName(filename) {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const spaced = nameWithoutExt
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_\-]+/g, ' ')
        .trim();
    return spaced.split(' ')
        .filter(w => w.length > 0)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

// Ordered pool of printable single-character identifiers
const CHARACTER_POOL = [
    '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '!', '?', '$', '%', '&', '*', '+', '=', '~', '^', '@', '<', '>', '[', ']', '|', '-'
];

class TileRegistry {
    constructor() {
        this.tiles = new Map(); // char -> tileObject
        this.filenameIndex = new Map(); // filename.toLowerCase() -> char
        this.initAirTile();
    }

    initAirTile() {
        this.register({
            char: '.',
            name: 'Air / Clear',
            filename: '',
            relPath: '',
            category: { id: 'air', name: 'Air & Clear', icon: '🧹' },
            img: null,
            isAir: true
        });
    }

    clear() {
        this.tiles.clear();
        this.filenameIndex.clear();
        this.initAirTile();
    }

    get(char) {
        return this.tiles.get(char) || null;
    }

    getByFilename(filename) {
        const char = this.filenameIndex.get(filename.toLowerCase());
        return char ? this.get(char) : null;
    }

    has(char) {
        return this.tiles.has(char);
    }

    register(tile) {
        this.tiles.set(tile.char, tile);
        if (tile.filename) {
            this.filenameIndex.set(tile.filename.toLowerCase(), tile.char);
        }
    }

    getAllTiles() {
        return Array.from(this.tiles.values());
    }

    getCategories() {
        const catsMap = new Map();
        for (const tile of this.tiles.values()) {
            if (tile.isAir && !tile.filename) continue;
            const catId = tile.category.id;
            if (!catsMap.has(catId)) {
                catsMap.set(catId, {
                    ...tile.category,
                    tiles: []
                });
            }
            catsMap.get(catId).tiles.push(tile);
        }
        return Array.from(catsMap.values());
    }

    suggestNextChar(preferredChar = null) {
        if (preferredChar && preferredChar !== '.' && !this.tiles.has(preferredChar)) {
            return preferredChar;
        }
        for (const ch of CHARACTER_POOL) {
            if (!this.tiles.has(ch)) {
                return ch;
            }
        }
        for (let code = 33; code <= 126; code++) {
            const ch = String.fromCharCode(code);
            if (ch !== '.' && ch !== '"' && ch !== '\\' && !this.tiles.has(ch)) {
                return ch;
            }
        }
        return '?';
    }

    updateChar(oldChar, newChar) {
        if (oldChar === newChar) return true;
        if (newChar === '.') return false; // dot is reserved for air
        const tile = this.tiles.get(oldChar);
        if (!tile || (tile.isAir && !tile.filename)) return false;

        const existingTile = this.tiles.get(newChar);
        if (existingTile) {
            // Swap characters between the two tiles
            existingTile.char = oldChar;
            tile.char = newChar;
            this.tiles.set(oldChar, existingTile);
            this.tiles.set(newChar, tile);
            if (existingTile.filename) this.filenameIndex.set(existingTile.filename.toLowerCase(), oldChar);
            if (tile.filename) this.filenameIndex.set(tile.filename.toLowerCase(), newChar);
        } else {
            this.tiles.delete(oldChar);
            tile.char = newChar;
            this.tiles.set(newChar, tile);
            if (tile.filename) this.filenameIndex.set(tile.filename.toLowerCase(), newChar);
        }
        return true;
    }
}

const tileRegistry = new TileRegistry();

// ==========================================
// 3. ASSET MANAGER
// ==========================================
class AssetManager {
    constructor() {
        this.cache = {}; // filename (lowercase) -> HTMLImageElement
        this.statusText = 'Not Selected';
        this.isLoaded = false;
    }

    loadDefaultRepoAssets() {
        tileRegistry.clear();
        let count = 0;

        Object.entries(RELATIVE_ASSET_PATHS).forEach(([filename, relPath]) => {
            const img = new Image();
            img.src = DEFAULT_ASSET_BASE + relPath;
            const lower = filename.toLowerCase();
            this.cache[lower] = img;

            const category = classifyAsset(filename, relPath);
            const isBg = category.id === 'backgrounds';

            if (!isBg) {
                const assignedChar = KENNEY_PRESET_MAP[lower] || tileRegistry.suggestNextChar();
                tileRegistry.register({
                    char: assignedChar,
                    name: formatSpriteName(filename),
                    filename: filename,
                    relPath: relPath,
                    category: category,
                    img: img,
                    isAir: false
                });
                count++;
            }

            img.onload = () => requestRender();
        });

        this.statusText = 'KennyAdventureV1 Default';
        this.isLoaded = true;
        this.updateBadge();
        renderPaletteUI();
        updateWizardCategoryChips();
        requestRender();
    }

    loadFromFolderFiles(files) {
        const fileList = Array.from(files).filter(f => {
            const name = f.name.toLowerCase();
            return /\.(png|jpe?g|webp|svg|gif|bmp|ico|avif)$/i.test(name);
        });

        if (fileList.length === 0) {
            showToast('No 2D image assets found in folder!');
            return;
        }

        // Sort files alphabetically by relative path so tiles group intuitively
        fileList.sort((a, b) => {
            const pathA = a.customRelativePath || a.webkitRelativePath || a.name;
            const pathB = b.customRelativePath || b.webkitRelativePath || b.name;
            return pathA.localeCompare(pathB);
        });

        tileRegistry.clear();
        let count = 0;

        fileList.forEach(file => {
            const filename = file.name;
            const relPath = file.customRelativePath || file.webkitRelativePath || file.name;
            const lower = filename.toLowerCase();
            const category = classifyAsset(filename, relPath);
            const isBg = category.id === 'backgrounds';

            const url = URL.createObjectURL(file);
            const img = new Image();
            img.src = url;
            this.cache[lower] = img;

            img.onload = () => requestRender();

            if (!isBg) {
                // Determine identifier character: check known preset first, then suggest next char
                let char = KENNEY_PRESET_MAP[lower];
                if (!char || tileRegistry.has(char)) {
                    const firstLetter = filename.charAt(0).toUpperCase();
                    char = tileRegistry.suggestNextChar(firstLetter);
                }

                tileRegistry.register({
                    char: char,
                    name: formatSpriteName(filename),
                    filename: filename,
                    relPath: relPath,
                    category: category,
                    img: img,
                    isAir: false
                });
                count++;
            }
        });

        const catCount = tileRegistry.getCategories().length;
        this.statusText = `Custom (${count} sprites, ${catCount} categories)`;
        this.isLoaded = true;
        this.updateBadge();

        const pathDisplay = document.getElementById('selected-assets-text');
        if (pathDisplay) {
            pathDisplay.innerText = `✓ Loaded ${count} sprites across ${catCount} categories`;
        }

        renderPaletteUI();
        updateWizardCategoryChips();
        showToast(`Loaded ${count} sprite assets across ${catCount} categories!`);
        requestRender();
    }

    updateBadge() {
        const badge = document.getElementById('assets-status-badge');
        if (badge) {
            badge.innerText = `Assets: ${this.statusText}`;
            badge.className = 'status-badge status-ok';
        }
    }

    getImageForChar(char) {
        const tile = tileRegistry.get(char);
        if (tile && tile.img && tile.img.complete && tile.img.naturalWidth > 0) {
            return tile.img;
        }
        return null;
    }

    getBackground(key) {
        const filename = key + '.png';
        const img = this.cache[filename.toLowerCase()];
        return (img && img.complete && img.naturalWidth > 0) ? img : null;
    }
}

const assets = new AssetManager();

// ==========================================
// 4. EDITOR STATE & STORAGE
// ==========================================
const EditorState = {
    grid: [],
    rows: 12,
    cols: 100,
    zoom: 0.75,
    activeTool: 'paint',
    activeChar: '#',
    showGrid: true,
    showCoords: true,
    hoverCol: -1,
    hoverRow: -1,
    isMouseDown: false,
    dragButton: 0,
    dragStartCol: -1,
    dragStartRow: -1,
    moveEntity: null,
    currentMapName: 'Untitled_Level',
    history: [],
    historyIdx: -1
};

const AUTOSAVE_KEY = 'universal_2d_map_draft';

function saveDraftToStorage() {
    try {
        const serializedTiles = [];
        for (const tile of tileRegistry.getAllTiles()) {
            if (tile.isAir && !tile.filename) continue;
            serializedTiles.push({
                char: tile.char,
                name: tile.name,
                filename: tile.filename,
                relPath: tile.relPath,
                catId: tile.category ? tile.category.id : 'general',
                catName: tile.category ? tile.category.name : 'General',
                catIcon: tile.category ? tile.category.icon : '📦'
            });
        }

        const data = {
            mapName: EditorState.currentMapName,
            rows: EditorState.rows,
            cols: EditorState.cols,
            grid: EditorState.grid,
            tileSize: TILE_SIZE,
            tiles: serializedTiles,
            timestamp: Date.now()
        };
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
        const indicator = document.getElementById('autosave-indicator');
        if (indicator) {
            indicator.innerText = '✓ Auto-saved';
            indicator.style.opacity = '1';
        }
    } catch (e) {
        console.warn('Storage save error:', e);
    }
}

function loadDraftFromStorage() {
    try {
        const raw = localStorage.getItem(AUTOSAVE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function initGridFromASCII(asciiLines, mapName = 'Level_Map') {
    EditorState.rows = asciiLines.length;
    EditorState.cols = asciiLines[0].length;
    EditorState.grid = asciiLines.map(line => line.split(''));
    EditorState.currentMapName = mapName;

    // Register any unseen characters as fallback tiles in tileRegistry
    EditorState.grid.forEach(row => {
        row.forEach(char => {
            if (char !== '.' && !tileRegistry.has(char)) {
                tileRegistry.register({
                    char: char,
                    name: `Map Tile [${char}]`,
                    filename: '',
                    relPath: '',
                    category: { id: 'imported', name: 'Imported Tiles', icon: '🗺️' },
                    img: null,
                    isAir: false
                });
            }
        });
    });

    renderPaletteUI();

    // Reset history
    EditorState.history = [];
    EditorState.historyIdx = -1;
    saveHistoryState();

    resizeCanvas();
    updateMapDimIndicator();
    updateMapBadge();
    syncCodeDrawerText();
    saveDraftToStorage();
    requestRender();
}

function saveHistoryState() {
    if (EditorState.historyIdx < EditorState.history.length - 1) {
        EditorState.history = EditorState.history.slice(0, EditorState.historyIdx + 1);
    }
    const snapshot = EditorState.grid.map(row => [...row]);
    EditorState.history.push(snapshot);
    if (EditorState.history.length > 40) EditorState.history.shift();
    EditorState.historyIdx = EditorState.history.length - 1;
    updateUndoRedoButtons();
    saveDraftToStorage();
}

function undo() {
    if (EditorState.historyIdx > 0) {
        EditorState.historyIdx--;
        EditorState.grid = EditorState.history[EditorState.historyIdx].map(row => [...row]);
        syncCodeDrawerText();
        updateUndoRedoButtons();
        saveDraftToStorage();
        requestRender();
        showToast('Undo');
    }
}

function redo() {
    if (EditorState.historyIdx < EditorState.history.length - 1) {
        EditorState.history++;
        EditorState.grid = EditorState.history[EditorState.historyIdx].map(row => [...row]);
        syncCodeDrawerText();
        updateUndoRedoButtons();
        saveDraftToStorage();
        requestRender();
        showToast('Redo');
    }
}

function updateUndoRedoButtons() {
    document.getElementById('btn-undo').disabled = (EditorState.historyIdx <= 0);
    document.getElementById('btn-redo').disabled = (EditorState.historyIdx >= EditorState.history.length - 1);
}

function updateMapBadge() {
    const titleEl = document.getElementById('current-project-title');
    const badgeEl = document.getElementById('map-status-badge');
    if (titleEl) titleEl.innerText = `Project: ${EditorState.currentMapName} (${EditorState.cols}x${EditorState.rows})`;
    if (badgeEl) {
        badgeEl.innerText = `Map: ${EditorState.currentMapName}`;
        badgeEl.className = 'status-badge status-ok';
    }
}

// ==========================================
// 5. CANVAS RENDERING
// ==========================================
const canvas = document.getElementById('editorCanvas');
const ctx = canvas.getContext('2d');
let renderRequested = false;

function requestRender() {
    if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(() => {
            renderEditorCanvas();
            renderRequested = false;
        });
    }
}

function resizeCanvas() {
    const scale = EditorState.zoom;
    canvas.width = EditorState.cols * TILE_SIZE * scale;
    canvas.height = EditorState.rows * TILE_SIZE * scale;
    requestRender();
}

function renderEditorCanvas() {
    if (!EditorState.grid || EditorState.grid.length === 0) return;

    const scale = EditorState.zoom;
    const tileW = TILE_SIZE * scale;
    const tileH = TILE_SIZE * scale;
    const fullW = canvas.width;
    const fullH = canvas.height;

    ctx.clearRect(0, 0, fullW, fullH);

    // 1. Sky & Backgrounds
    ctx.fillStyle = '#bbf3f9';
    ctx.fillRect(0, 0, fullW, fullH);

    const cloudsImg = assets.getBackground('background_clouds');
    if (cloudsImg) {
        const cW = 384 * scale;
        const cH = 256 * scale;
        for (let x = 0; x < fullW; x += cW) {
            ctx.drawImage(cloudsImg, x, 30 * scale, cW, cH);
        }
    }

    const hillsImg = assets.getBackground('background_color_hills');
    if (hillsImg) {
        const hW = 384 * scale;
        const hH = 320 * scale;
        for (let x = 0; x < fullW; x += hW) {
            ctx.drawImage(hillsImg, x, fullH - hH - 20 * scale, hW, hH);
        }
    }

    // 2. Render Tiles & Entities
    for (let r = 0; r < EditorState.rows; r++) {
        for (let c = 0; c < EditorState.cols; c++) {
            const char = EditorState.grid[r][c];
            const px = c * tileW;
            const py = r * tileH;
            const tile = tileRegistry.get(char);
            const img = tile ? tile.img : assets.getImageForChar(char);

            // Empty void cells (deleted ground): do not draw anything
            if (char === ' ') continue;

            if (char === '.') {
                // If dot has an image asset (like TurboDrift land_grass01.png), draw it!
                if (img && img.complete && img.naturalWidth > 0) {
                    ctx.drawImage(img, px, py, tileW, tileH);
                }
                continue;
            }

            if (img && img.complete && img.naturalWidth > 0) {
                if (char === 'P' && TILE_SIZE <= 64) {
                    ctx.drawImage(img, px + 4 * scale, py + 4 * scale, 56 * scale, 56 * scale);
                } else if ((char === 'C' || char === 'G' || char === 'H') && TILE_SIZE <= 64) {
                    ctx.drawImage(img, px + 12 * scale, py + 12 * scale, 40 * scale, 40 * scale);
                } else {
                    ctx.drawImage(img, px, py, tileW, tileH);
                }
            } else {
                // Color fallback box with character identifier
                ctx.fillStyle = FALLBACK_COLORS[char] || '#4a6572';
                ctx.fillRect(px + 2, py + 2, tileW - 4, tileH - 4);
                ctx.fillStyle = '#ffffff';
                ctx.font = `bold ${Math.max(12, 18 * scale)}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(char, px + tileW / 2, py + tileH / 2);
            }
        }
    }

    // 3. Grid Lines
    if (EditorState.showGrid) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        for (let c = 0; c <= EditorState.cols; c++) {
            ctx.beginPath();
            ctx.moveTo(c * tileW + 0.5, 0);
            ctx.lineTo(c * tileW + 0.5, fullH);
            ctx.stroke();
        }
        for (let r = 0; r <= EditorState.rows; r++) {
            ctx.beginPath();
            ctx.moveTo(0, r * tileH + 0.5);
            ctx.lineTo(fullW, r * tileH + 0.5);
            ctx.stroke();
        }
    }

    // 4. Coordinates
    if (EditorState.showCoords && scale >= 0.4) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        for (let c = 0; c < EditorState.cols; c += 5) {
            ctx.fillText(c.toString(), c * tileW + 3, 3);
        }
    }

    // 5. Line Drawing Preview
    if (EditorState.isMouseDown && EditorState.activeTool === 'line' && EditorState.dragStartCol >= 0) {
        const startC = Math.min(EditorState.dragStartCol, EditorState.hoverCol);
        const endC = Math.max(EditorState.dragStartCol, EditorState.hoverCol);
        const r = EditorState.dragStartRow;
        ctx.strokeStyle = '#3ea6ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(startC * tileW, r * tileH, (endC - startC + 1) * tileW, tileH);
    }

    // 6. Entity Move Dragging Highlight
    if (EditorState.moveEntity) {
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 2;
        ctx.strokeRect(EditorState.moveEntity.fromCol * tileW, EditorState.moveEntity.fromRow * tileH, tileW, tileH);

        if (EditorState.hoverCol >= 0 && EditorState.hoverRow >= 0) {
            ctx.strokeStyle = '#40d17a';
            ctx.lineWidth = 3;
            ctx.strokeRect(EditorState.hoverCol * tileW, EditorState.hoverRow * tileH, tileW, tileH);
        }
    }

    // 7. Hover Cursor Ghost
    if (EditorState.hoverCol >= 0 && EditorState.hoverRow >= 0 && !EditorState.moveEntity) {
        const hx = EditorState.hoverCol * tileW;
        const hy = EditorState.hoverRow * tileH;
        const isErase = EditorState.activeTool === 'erase' || EditorState.activeChar === ' ' || EditorState.activeChar === '.';
        ctx.fillStyle = isErase ? 'rgba(255, 71, 87, 0.22)' : 'rgba(62, 166, 255, 0.22)';
        ctx.fillRect(hx, hy, tileW, tileH);
        ctx.strokeStyle = isErase ? '#ff4757' : '#3ea6ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(hx + 0.5, hy + 0.5, tileW - 1, tileH - 1);

        if (EditorState.activeTool === 'paint' && EditorState.activeChar !== '.' && EditorState.activeChar !== ' ') {
            const ghostImg = assets.getImageForChar(EditorState.activeChar);
            if (ghostImg && ghostImg.complete && ghostImg.naturalWidth > 0) {
                ctx.globalAlpha = 0.65;
                ctx.drawImage(ghostImg, hx, hy, tileW, tileH);
                ctx.globalAlpha = 1.0;
            }
        }
    }
}

// ==========================================
// 6. MOUSE & CANVAS INTERACTIONS
// ==========================================
const scrollWrapper = document.getElementById('canvas-scroll-wrapper');
let isSpacePressed = false;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('textarea, input')) {
        isSpacePressed = true;
        scrollWrapper.style.cursor = 'grab';
        e.preventDefault();
    }
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ') {
        e.preventDefault();
        undo();
    }
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyY') {
        e.preventDefault();
        redo();
    }
    if (e.code === 'KeyP' && !e.target.matches('textarea, input')) setActiveTool('paint');
    if (e.code === 'KeyL' && !e.target.matches('textarea, input')) setActiveTool('line');
    if (e.code === 'KeyE' && !e.target.matches('textarea, input')) setActiveTool('erase');
    if (e.code === 'KeyM' && !e.target.matches('textarea, input')) setActiveTool('move');
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        isSpacePressed = false;
        isPanning = false;
        scrollWrapper.style.cursor = 'crosshair';
    }
});

function getCellFromMouseEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scale = EditorState.zoom;
    const col = Math.floor(x / (TILE_SIZE * scale));
    const row = Math.floor(y / (TILE_SIZE * scale));
    return {
        col: Math.max(0, Math.min(col, EditorState.cols - 1)),
        row: Math.max(0, Math.min(row, EditorState.rows - 1))
    };
}

canvas.addEventListener('contextmenu', e => e.preventDefault());

function performErase(col, row) {
    if (row < 0 || row >= EditorState.rows || col < 0 || col >= EditorState.cols) return;
    const current = EditorState.grid[row][col];
    if (current === '.') {
        setCell(col, row, ' '); // Clicking erase on ground deletes it completely (empty void)
    } else {
        setCell(col, row, '.'); // Clicking erase on an object or road clears it back to ground
    }
}

canvas.addEventListener('mousedown', (e) => {
    if (isSpacePressed || e.button === 1) {
        isPanning = true;
        panStartX = e.clientX + scrollWrapper.scrollLeft;
        panStartY = e.clientY + scrollWrapper.scrollTop;
        scrollWrapper.style.cursor = 'grabbing';
        return;
    }

    const { col, row } = getCellFromMouseEvent(e);
    EditorState.isMouseDown = true;
    EditorState.dragButton = e.button;
    EditorState.dragStartCol = col;
    EditorState.dragStartRow = row;

    if (e.button === 2) {
        performErase(col, row);
        return;
    }

    if (EditorState.activeTool === 'move') {
        const char = EditorState.grid[row][col];
        if (char !== '.' && char !== ' ') {
            EditorState.moveEntity = { char, fromCol: col, fromRow: row };
            setCell(col, row, '.');
        }
        return;
    }

    if (EditorState.activeTool === 'paint') {
        setCell(col, row, EditorState.activeChar);
    } else if (EditorState.activeTool === 'erase') {
        performErase(col, row);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isPanning) {
        scrollWrapper.scrollLeft = panStartX - e.clientX;
        scrollWrapper.scrollTop = panStartY - e.clientY;
        return;
    }

    const { col, row } = getCellFromMouseEvent(e);
    EditorState.hoverCol = col;
    EditorState.hoverRow = row;
    updateStatusBar(col, row);

    if (EditorState.isMouseDown) {
        if (EditorState.dragButton === 2 || EditorState.activeTool === 'erase') {
            performErase(col, row);
        } else if (EditorState.activeTool === 'paint') {
            setCell(col, row, EditorState.activeChar);
        }
    }

    requestRender();
});

window.addEventListener('mouseup', () => {
    if (isPanning) {
        isPanning = false;
        scrollWrapper.style.cursor = isSpacePressed ? 'grab' : 'crosshair';
    }

    if (EditorState.isMouseDown) {
        if (EditorState.activeTool === 'line' && EditorState.dragStartCol >= 0) {
            const startC = Math.min(EditorState.dragStartCol, EditorState.hoverCol);
            const endC = Math.max(EditorState.dragStartCol, EditorState.hoverCol);
            const r = EditorState.dragStartRow;
            for (let c = startC; c <= endC; c++) {
                EditorState.grid[r][c] = EditorState.activeChar;
            }
            saveHistoryState();
            syncCodeDrawerText();
            requestRender();
        }

        if (EditorState.moveEntity) {
            const { char } = EditorState.moveEntity;
            setCell(EditorState.hoverCol, EditorState.hoverRow, char);
            EditorState.moveEntity = null;
        }

        EditorState.isMouseDown = false;
        EditorState.dragStartCol = -1;
        EditorState.dragStartRow = -1;
        requestRender();
    }
});

canvas.addEventListener('mouseleave', () => {
    EditorState.hoverCol = -1;
    EditorState.hoverRow = -1;
    requestRender();
});

function setCell(col, row, char) {
    if (row < 0 || row >= EditorState.rows || col < 0 || col >= EditorState.cols) return;
    if (EditorState.grid[row][col] !== char) {
        EditorState.grid[row][col] = char;
        saveHistoryState();
        syncCodeDrawerText();
        requestRender();
    }
}

function updateStatusBar(col, row) {
    const posEl = document.getElementById('cursor-pos-indicator');
    const charEl = document.getElementById('cell-char-indicator');
    if (posEl) posEl.innerText = `Col: ${col}, Row: ${row} (X: ${col * TILE_SIZE}px, Y: ${row * TILE_SIZE}px)`;
    if (charEl) {
        const char = (EditorState.grid[row] && EditorState.grid[row][col] !== undefined) ? EditorState.grid[row][col] : ' ';
        const displayChar = char === ' ' ? 'VOID' : char;
        charEl.innerText = `Tile: ${getTileName(char)} [ ${displayChar} ]`;
    }
}

function updateMapDimIndicator() {
    const el = document.getElementById('map-dim-indicator');
    if (el) {
        el.innerText = `Stage: ${EditorState.cols} x ${EditorState.rows} (${EditorState.cols * TILE_SIZE} x ${EditorState.rows * TILE_SIZE} px)`;
    }
}

function getTileName(char) {
    if (char === ' ') return 'Empty Void';
    if (char === '.') {
        const dotTile = tileRegistry.get('.');
        if (dotTile && dotTile.name && dotTile.name !== 'Air / Clear') {
            return dotTile.name;
        }
        return 'Ground / Air';
    }
    const tile = tileRegistry.get(char);
    if (tile) return tile.name;
    return `Tile [${char}]`;
}

// ==========================================
// 7. DYNAMIC PALETTE UI, SEARCH & IDENTIFIERS
// ==========================================
let currentCategoryFilter = 'all';
let currentSearchTerm = '';

function renderPaletteUI() {
    renderCategoryPills();
    renderPaletteList();
    updateActiveTilePreview();
}

function renderCategoryPills() {
    const pillsBar = document.getElementById('category-filter-pills');
    if (!pillsBar) return;
    pillsBar.innerHTML = '';

    const categories = tileRegistry.getCategories();
    const totalTiles = tileRegistry.getAllTiles().filter(t => !t.isAir || t.filename).length;

    // "All" Pill
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `category-pill ${currentCategoryFilter === 'all' ? 'active' : ''}`;
    allBtn.innerHTML = `All <span class="pill-count">${totalTiles}</span>`;
    allBtn.onclick = () => {
        currentCategoryFilter = 'all';
        renderCategoryPills();
        renderPaletteList();
    };
    pillsBar.appendChild(allBtn);

    // Each Category Pill
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `category-pill ${currentCategoryFilter === cat.id ? 'active' : ''}`;
        btn.innerHTML = `${cat.icon} ${cat.name} <span class="pill-count">${cat.tiles.length}</span>`;
        btn.onclick = () => {
            currentCategoryFilter = cat.id;
            renderCategoryPills();
            renderPaletteList();
        };
        pillsBar.appendChild(btn);
    });
}

function renderPaletteList() {
    const list = document.getElementById('palette-list');
    if (!list) return;
    list.innerHTML = '';

    const categories = tileRegistry.getCategories();
    const search = currentSearchTerm.toLowerCase().trim();

    // 1. Air / Eraser Tile Card & Empty Void
    const airCategory = document.createElement('div');
    airCategory.className = 'palette-category';
    const dotTile = tileRegistry.get('.');
    const dotName = (dotTile && dotTile.name && dotTile.name !== 'Air / Clear') ? dotTile.name : 'Clear / Ground';
    const dotTitle = `${dotName} (.) - Clears back to ground`;

    airCategory.innerHTML = `
        <div class="category-header">
            <h4 class="category-title">🧹 Quick Erase & Void</h4>
        </div>
        <div class="palette-grid">
            <div class="palette-card ${EditorState.activeChar === '.' ? 'active' : ''}" data-char="." title="${dotTitle}">
                <div class="palette-preview" style="background-color: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 14px;">🧹</div>
                <span class="char-tag">.</span>
                <span class="card-label">${dotName}</span>
            </div>
            <div class="palette-card ${EditorState.activeChar === ' ' ? 'active' : ''}" data-char=" " title="Empty Void (' ') - Deletes ground completely">
                <div class="palette-preview" style="background-color: rgba(0,0,0,0.45); border: 1px dashed rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 12px; color: #88a0bc;">∅</div>
                <span class="char-tag">␣</span>
                <span class="card-label">Empty Void</span>
            </div>
        </div>
    `;
    list.appendChild(airCategory);

    // 2. Render Categories
    categories.forEach(cat => {
        if (currentCategoryFilter !== 'all' && currentCategoryFilter !== cat.id) return;

        const matchingTiles = cat.tiles.filter(t => {
            if (!search) return true;
            return t.name.toLowerCase().includes(search) ||
                   t.char.toLowerCase() === search ||
                   (t.filename && t.filename.toLowerCase().includes(search)) ||
                   cat.name.toLowerCase().includes(search);
        });

        if (matchingTiles.length === 0) return;

        const catBlock = document.createElement('div');
        catBlock.className = 'palette-category';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
            <h4 class="category-title">${cat.icon} ${cat.name}</h4>
            <span class="category-count">${matchingTiles.length} items</span>
        `;
        catBlock.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'palette-grid';

        matchingTiles.forEach(tile => {
            const card = document.createElement('div');
            card.className = `palette-card ${EditorState.activeChar === tile.char ? 'active' : ''}`;
            card.dataset.char = tile.char;
            card.title = `${tile.name} (Key: [ ${tile.char} ])\nFile: ${tile.filename || 'Custom'}\nPath: ${tile.relPath || '-'}\nClick tile to select; Click tag to edit identifier.`;

            // Preview Thumbnail
            const preview = document.createElement('div');
            preview.className = 'palette-preview';
            if (tile.img && tile.img.src) {
                preview.style.backgroundImage = `url("${tile.img.src}")`;
            } else {
                preview.style.backgroundColor = FALLBACK_COLORS[tile.char] || '#555';
            }

            // Identifier Tag (clickable to edit)
            const tag = document.createElement('span');
            tag.className = 'char-tag';
            tag.innerText = tile.char;
            tag.title = `Click to customize identifier [ ${tile.char} ]`;
            tag.onclick = (e) => {
                e.stopPropagation();
                openEditIdentifierModal(tile);
            };

            // Label
            const label = document.createElement('span');
            label.className = 'card-label';
            label.innerText = tile.name;

            card.appendChild(preview);
            card.appendChild(tag);
            card.appendChild(label);

            card.onclick = () => {
                selectActiveTile(tile.char);
            };

            grid.appendChild(card);
        });

        catBlock.appendChild(grid);
        list.appendChild(catBlock);
    });

    // Attach click for Air and Void cards
    const airCard = list.querySelector('.palette-card[data-char="."]');
    if (airCard) {
        airCard.onclick = () => selectActiveTile('.');
    }
    const voidCard = list.querySelector('.palette-card[data-char=" "]');
    if (voidCard) {
        voidCard.onclick = () => selectActiveTile(' ');
    }
}

function selectActiveTile(char) {
    EditorState.activeChar = char;
    document.querySelectorAll('.palette-card').forEach(c => {
        c.classList.toggle('active', c.dataset.char === char);
    });
    updateActiveTilePreview();
    if (char === '.' || char === ' ') {
        setActiveTool('erase');
    } else if (EditorState.activeTool === 'erase') {
        setActiveTool('paint');
    }
    requestRender();
}

function updateActiveTilePreview() {
    const preview = document.getElementById('active-tile-preview');
    if (!preview) return;
    const char = EditorState.activeChar;
    const displayChar = char === ' ' ? '␣' : char;
    const name = getTileName(char);
    preview.innerText = `Active: [ ${displayChar} ] ${name}`;
}

// ==========================================
// 8. EDIT TILE IDENTIFIER MODAL
// ==========================================
let editingTileRef = null;

function openEditIdentifierModal(tile) {
    if (!tile || (tile.isAir && !tile.filename)) return;
    editingTileRef = tile;

    const modal = document.getElementById('edit-id-modal');
    const imgPreview = document.getElementById('edit-id-img-preview');
    const tileNameEl = document.getElementById('edit-id-tile-name');
    const tileCatEl = document.getElementById('edit-id-tile-cat');
    const tileFileEl = document.getElementById('edit-id-tile-file');
    const inputChar = document.getElementById('input-tile-char');
    const statusEl = document.getElementById('edit-id-status');

    if (imgPreview) {
        if (tile.img && tile.img.src) {
            imgPreview.style.backgroundImage = `url("${tile.img.src}")`;
            imgPreview.style.backgroundColor = 'transparent';
        } else {
            imgPreview.style.backgroundImage = 'none';
            imgPreview.style.backgroundColor = FALLBACK_COLORS[tile.char] || '#555';
        }
    }

    if (tileNameEl) tileNameEl.innerText = tile.name;
    if (tileCatEl) tileCatEl.innerText = `Category: ${tile.category ? tile.category.name : 'General'}`;
    if (tileFileEl) tileFileEl.innerText = tile.filename || tile.relPath || '(Custom)';

    if (inputChar) {
        inputChar.value = tile.char;
        inputChar.focus();
        inputChar.select();
    }

    if (statusEl) {
        statusEl.className = 'edit-id-status status-ok';
        statusEl.innerText = `Current identifier: [ ${tile.char} ]`;
    }

    modal.classList.add('open');
}

function closeEditIdentifierModal() {
    const modal = document.getElementById('edit-id-modal');
    if (modal) modal.classList.remove('open');
    editingTileRef = null;
}

function setupEditIdentifierModal() {
    const modal = document.getElementById('edit-id-modal');
    const closeBtn = document.getElementById('btn-close-edit-id');
    const cancelBtn = document.getElementById('btn-cancel-edit-id');
    const saveBtn = document.getElementById('btn-save-edit-id');
    const inputChar = document.getElementById('input-tile-char');
    const statusEl = document.getElementById('edit-id-status');

    if (closeBtn) closeBtn.onclick = closeEditIdentifierModal;
    if (cancelBtn) cancelBtn.onclick = closeEditIdentifierModal;

    if (inputChar) {
        inputChar.oninput = () => {
            const val = inputChar.value;
            if (!val) {
                statusEl.className = 'edit-id-status status-err';
                statusEl.innerText = 'Please enter a single printable character.';
                return;
            }
            if (val === '.' || val === ' ') {
                statusEl.className = 'edit-id-status status-err';
                statusEl.innerText = "Dot '.' and Space ' ' are reserved for ground and void.";
                return;
            }
            if (val === '"' || val === '\\') {
                statusEl.className = 'edit-id-status status-err';
                statusEl.innerText = 'Quotes and backslashes cannot be used in map arrays.';
                return;
            }

            if (editingTileRef && val === editingTileRef.char) {
                statusEl.className = 'edit-id-status status-ok';
                statusEl.innerText = `Keeping current identifier: [ ${val} ]`;
                return;
            }

            const existing = tileRegistry.get(val);
            if (existing) {
                statusEl.className = 'edit-id-status status-warn';
                statusEl.innerText = `⚠️ In use by "${existing.name}". Saving will swap identifiers.`;
            } else {
                statusEl.className = 'edit-id-status status-ok';
                statusEl.innerText = `✓ Identifier [ ${val} ] is available!`;
            }
        };

        inputChar.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveBtn.click();
            }
        };
    }

    if (saveBtn) {
        saveBtn.onclick = () => {
            if (!editingTileRef) return;
            const newChar = inputChar.value;
            if (!newChar || newChar === '.' || newChar === ' ' || newChar === '"' || newChar === '\\') {
                showToast('Invalid character for identifier!');
                return;
            }

            const oldChar = editingTileRef.char;
            if (newChar === oldChar) {
                closeEditIdentifierModal();
                return;
            }

            const existingTile = tileRegistry.get(newChar);

            // Update in registry
            tileRegistry.updateChar(oldChar, newChar);

            // Update grid occurrences
            let countReplaced = 0;
            for (let r = 0; r < EditorState.rows; r++) {
                for (let c = 0; c < EditorState.cols; c++) {
                    if (EditorState.grid[r][c] === oldChar) {
                        EditorState.grid[r][c] = newChar;
                        countReplaced++;
                    } else if (existingTile && EditorState.grid[r][c] === newChar) {
                        EditorState.grid[r][c] = oldChar;
                    }
                }
            }

            if (EditorState.activeChar === oldChar) {
                EditorState.activeChar = newChar;
            }

            saveHistoryState();
            syncCodeDrawerText();
            renderPaletteUI();
            requestRender();
            closeEditIdentifierModal();

            if (existingTile) {
                showToast(`Swapped identifiers: [ ${oldChar} ] ⇄ [ ${newChar} ] (${existingTile.name})`);
            } else {
                showToast(`Updated identifier to [ ${newChar} ] (${countReplaced} tiles on map updated)`);
            }
        };
    }
}

// ==========================================
// 9. MAP FILE LOADER & SELF-DESCRIBING FORMAT
// ==========================================

/**
 * Universal Map File Loader
 * Supports unified Self-Describing Map Format (tileSize, assets, grid),
 * JSON objects, and legacy plain ASCII string arrays.
 */
function loadMapFileContent(fileContent, defaultName = 'Level_Map') {
    if (!fileContent || typeof fileContent !== 'string') return;

    try {
        let mapData = null;

        // 1. Try clean JSON parse
        const trimmed = fileContent.trim();
        if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) {
                    initGridFromASCII(parsed, defaultName);
                    return;
                } else if (parsed && typeof parsed === 'object' && parsed.grid) {
                    mapData = parsed;
                }
            } catch (_) {}
        }

        // 2. Evaluate safely in sandbox via new Function (for window.CURRENT_LEVEL_MAP / window.CURRENT_TURBO_MAP)
        if (!mapData) {
            const sandbox = {};
            const runner = new Function('window', 'document', 'module', 'exports', fileContent);
            runner(sandbox, {}, {}, {});
            mapData = sandbox.CURRENT_LEVEL_MAP || sandbox.CURRENT_TURBO_MAP || sandbox.LEVEL_MAP || sandbox.DEFAULT_MAP;
        }

        if (mapData && typeof mapData === 'object' && mapData.grid) {
            applySelfDescribingMap(mapData, defaultName);
            return;
        }
    } catch (e) {
        console.warn('Could not evaluate as object module, falling back to regex parser:', e);
    }

    // 3. Fallback: regular regex parser for older raw ASCII arrays or plain text
    parseAndLoadMapText(fileContent, defaultName);
}

function applySelfDescribingMap(mapData, defaultName = 'Level_Map') {
    const mapName = mapData.name || defaultName;
    EditorState.currentMapName = mapName;

    // A. Dynamic Tile Size (e.g. 64px for Kenny, 128px for Turbo Drift)
    if (mapData.tileSize) {
        TILE_SIZE = parseInt(mapData.tileSize, 10) || 64;
        const sizeSelect = document.getElementById('setup-tile-size');
        if (sizeSelect) {
            let found = false;
            for (let i = 0; i < sizeSelect.options.length; i++) {
                if (parseInt(sizeSelect.options[i].value, 10) === TILE_SIZE) {
                    sizeSelect.selectedIndex = i;
                    found = true;
                    break;
                }
            }
            if (!found) {
                const opt = document.createElement('option');
                opt.value = TILE_SIZE.toString();
                opt.text = `${TILE_SIZE} x ${TILE_SIZE} px`;
                opt.selected = true;
                sizeSelect.appendChild(opt);
            }
        }
    }

    // B. Automatically load all symbols and their asset names
    if (mapData.assets && typeof mapData.assets === 'object') {
        Object.entries(mapData.assets).forEach(([char, filename]) => {
            if (typeof filename !== 'string') return;
            const lower = filename.toLowerCase();
            let img = assets.cache[lower];

            if (!img) {
                img = new Image();
                if (RELATIVE_ASSET_PATHS[lower]) {
                    img.src = DEFAULT_ASSET_BASE + RELATIVE_ASSET_PATHS[lower];
                } else {
                    img.src = filename;
                }
                img.onload = () => requestRender();
                assets.cache[lower] = img;
            }

            const category = classifyAsset(filename);
            tileRegistry.register({
                char: char,
                name: formatSpriteName(filename),
                filename: filename,
                relPath: filename,
                category: category,
                img: img,
                isAir: (char === '.')
            });
        });
    }

    // C. Load the grid
    if (Array.isArray(mapData.grid) && mapData.grid.length > 0) {
        initGridFromASCII(mapData.grid, mapName);
    }

    // Select first non-air tile as active tile if current is '.'
    const allTiles = tileRegistry.getAllTiles().filter(t => !t.isAir);
    if (allTiles.length > 0 && EditorState.activeChar === '.') {
        selectActiveTile(allTiles[0].char);
    }

    renderPaletteUI();
    updateMapBadge();
    resizeCanvas();
    syncCodeDrawerText();
    saveDraftToStorage();
    requestRender();
    showToast(`Loaded "${mapName}" (${TILE_SIZE}px tiles, ${Object.keys(mapData.assets || {}).length} assets)`);
}

function parseAndLoadMapText(rawText, mapName = 'Level_Map') {
    // Check if rawText contains object definition like window.CURRENT_LEVEL_MAP = { ... }
    if (rawText.includes('CURRENT_LEVEL_MAP') || rawText.includes('CURRENT_TURBO_MAP') || rawText.includes('tileSize')) {
        try {
            const sandbox = {};
            new Function('window', 'document', 'module', 'exports', rawText)(sandbox, {}, {}, {});
            const mapData = sandbox.CURRENT_LEVEL_MAP || sandbox.CURRENT_TURBO_MAP || sandbox.LEVEL_MAP;
            if (mapData && typeof mapData === 'object' && mapData.grid) {
                applySelfDescribingMap(mapData, mapName);
                return;
            }
        } catch (_) {}
    }

    // Universal ASCII row extractor: matches any quoted string per line
    const regex = /"([^"\r\n]+)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(rawText)) !== null) {
        matches.push(match[1]);
    }

    if (matches.length >= 2) {
        initGridFromASCII(matches, mapName);
        return;
    }

    // Fallback: unquoted plain ASCII lines
    const lines = rawText.split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0 && !l.startsWith('//') && !l.startsWith('const') && !l.startsWith('/*') && !l.startsWith('*') && !l.startsWith('];') && !l.startsWith('window.'));

    if (lines.length >= 2) {
        initGridFromASCII(lines, mapName);
    } else {
        const msg = 'Could not detect a valid map format. Please ensure rows are enclosed in quotes or plain ASCII.';
        if (typeof showToast === 'function') {
            showToast(msg);
        } else {
            console.warn(msg);
        }
    }
}

// ==========================================
// 10. SETUP MODAL WIZARD LOGIC
// ==========================================
let chosenMapSourceType = 'file'; // 'file', 'preset', 'new', 'paste'
let chosenMapData = null;
let chosenMapFilename = 'Level_Map';

// Recursive folder drag-and-drop file retriever
async function getAllFilesFromDataTransfer(items, fallbackFiles) {
    const files = [];
    if (items && items.length > 0 && items[0].webkitGetAsEntry) {
        const queue = [];
        for (let i = 0; i < items.length; i++) {
            const entry = items[i].webkitGetAsEntry();
            if (entry) queue.push(entry);
        }
        while (queue.length > 0) {
            const entry = queue.shift();
            if (entry.isFile) {
                const file = await new Promise(res => entry.file(res, () => res(null)));
                if (file) {
                    file.customRelativePath = entry.fullPath ? entry.fullPath.replace(/^\//, '') : file.name;
                    files.push(file);
                }
            } else if (entry.isDirectory) {
                const dirReader = entry.createReader();
                const readEntries = async () => {
                    return new Promise(res => {
                        const all = [];
                        function readBatch() {
                            dirReader.readEntries(results => {
                                if (!results || results.length === 0) res(all);
                                else {
                                    all.push(...results);
                                    readBatch();
                                }
                            }, () => res(all));
                        }
                        readBatch();
                    });
                };
                const subEntries = await readEntries();
                for (const sub of subEntries) {
                    queue.push(sub);
                }
            }
        }
    }
    if (files.length === 0 && fallbackFiles && fallbackFiles.length > 0) {
        return Array.from(fallbackFiles);
    }
    return files;
}

function updateWizardCategoryChips() {
    const container = document.getElementById('wizard-category-chips');
    if (!container) return;
    container.innerHTML = '';
    const cats = tileRegistry.getCategories();
    cats.forEach(cat => {
        const chip = document.createElement('div');
        chip.className = 'wizard-category-chip';
        chip.innerHTML = `<span>${cat.icon}</span> <span>${cat.name}</span> <span class="chip-count">${cat.tiles.length}</span>`;
        container.appendChild(chip);
    });
}

function setupWizardInteractions() {
    const modal = document.getElementById('setup-modal');
    const openBtn = document.getElementById('btn-open-setup');
    const closeBtn = document.getElementById('btn-close-setup');

    openBtn.onclick = () => {
        closeBtn.style.display = 'block';
        modal.classList.add('open');
    };

    closeBtn.onclick = () => {
        modal.classList.remove('open');
    };

    // Asset selection
    const browseAssetsBtn = document.getElementById('btn-browse-assets');
    const assetsInput = document.getElementById('assets-folder-input');
    const assetsDropZone = document.getElementById('assets-drop-zone');
    const defaultAssetsBtn = document.getElementById('btn-use-default-assets');

    browseAssetsBtn.onclick = () => assetsInput.click();
    assetsInput.onchange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            assets.loadFromFolderFiles(e.target.files);
        }
    };

    defaultAssetsBtn.onclick = () => {
        assets.loadDefaultRepoAssets();
        document.getElementById('selected-assets-text').innerText = '✓ Using default KennyAdventureV1 Assets';
        showToast('Linked KennyAdventureV1 Default Assets!');
    };

    // Drag and Drop for Assets Folder
    assetsDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        assetsDropZone.classList.add('dragover');
    });
    assetsDropZone.addEventListener('dragleave', () => assetsDropZone.classList.remove('dragover'));
    assetsDropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        assetsDropZone.classList.remove('dragover');
        const files = await getAllFilesFromDataTransfer(e.dataTransfer.items, e.dataTransfer.files);
        if (files && files.length > 0) {
            assets.loadFromFolderFiles(files);
        }
    });

    // Map source tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.dataset.tab;
            document.getElementById(targetId).classList.add('active');
            chosenMapSourceType = targetId.replace('tab-', '');
        };
    });

    // Map file browser
    const browseMapBtn = document.getElementById('btn-browse-map');
    const mapInput = document.getElementById('map-file-input');
    const mapDropZone = document.getElementById('map-drop-zone');

    browseMapBtn.onclick = () => mapInput.click();
    mapInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) handleMapFileSelect(file);
    };

    mapDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        mapDropZone.classList.add('dragover');
    });
    mapDropZone.addEventListener('dragleave', () => mapDropZone.classList.remove('dragover'));
    mapDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        mapDropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleMapFileSelect(e.dataTransfer.files[0]);
        }
    });

    function handleMapFileSelect(file) {
        chosenMapFilename = file.name.replace(/\.[^/.]+$/, '');
        const reader = new FileReader();
        reader.onload = (evt) => {
            chosenMapData = evt.target.result;
            document.getElementById('selected-map-text').innerText = `✓ Loaded: ${file.name}`;
            showToast(`Ready to load ${file.name}`);
        };
        reader.readAsText(file);
    }

    // Check if previous session exists in localStorage
    const savedDraft = loadDraftFromStorage();
    const resumeBtn = document.getElementById('btn-resume-session');
    if (savedDraft && resumeBtn) {
        resumeBtn.style.display = 'inline-flex';
        resumeBtn.onclick = () => {
            if (savedDraft.grid) {
                EditorState.grid = savedDraft.grid;
                EditorState.rows = savedDraft.rows || savedDraft.grid.length;
                EditorState.cols = savedDraft.cols || savedDraft.grid[0].length;
                EditorState.currentMapName = savedDraft.mapName || 'Resumed_Level';
                if (savedDraft.tileSize) TILE_SIZE = savedDraft.tileSize;

                // Restore custom tiles if present
                if (savedDraft.tiles && Array.isArray(savedDraft.tiles)) {
                    savedDraft.tiles.forEach(t => {
                        if (!tileRegistry.has(t.char)) {
                            tileRegistry.register({
                                char: t.char,
                                name: t.name,
                                filename: t.filename,
                                relPath: t.relPath,
                                category: { id: t.catId || 'general', name: t.catName || 'General', icon: t.catIcon || '📦' },
                                img: assets.getImageForChar(t.char),
                                isAir: false
                            });
                        }
                    });
                }

                if (!assets.isLoaded) assets.loadDefaultRepoAssets();
                modal.classList.remove('open');
                closeBtn.style.display = 'block';
                saveHistoryState();
                resizeCanvas();
                updateMapDimIndicator();
                updateMapBadge();
                renderPaletteUI();
                syncCodeDrawerText();
                requestRender();
                showToast('Resumed previous session!');
            }
        };
    }

    // Launch Editor Button
    document.getElementById('btn-start-editing').onclick = () => {
        // Ensure assets are loaded
        if (!assets.isLoaded) {
            assets.loadDefaultRepoAssets();
        }

        // Apply Tile Size
        const sizeSelect = document.getElementById('setup-tile-size');
        if (sizeSelect) {
            TILE_SIZE = parseInt(sizeSelect.value, 10) || 64;
        }

        // Load chosen map
        if (chosenMapSourceType === 'file' && chosenMapData) {
            loadMapFileContent(chosenMapData, chosenMapFilename);
        } else if (chosenMapSourceType === 'preset') {
            const presetVal = document.getElementById('preset-select').value;
            if (presetVal === 'turbodrift') {
                applySelfDescribingMap(PRESET_TURBO_DRIFT, 'Default Circuit');
            } else if (presetVal === 'level1') {
                applySelfDescribingMap(PRESET_KENNY_LEVEL_1, 'Level 1: Sunny Meadow');
            } else if (presetVal === 'level2') {
                initGridFromASCII(PRESET_LEVEL_2, 'Level 2: Template');
            }
        } else if (chosenMapSourceType === 'new') {
            const cols = parseInt(document.getElementById('new-map-cols').value, 10) || 100;
            const rows = parseInt(document.getElementById('new-map-rows').value, 10) || 12;
            createBlankMap(cols, rows);
        } else if (chosenMapSourceType === 'paste') {
            const text = document.getElementById('setup-paste-textarea').value;
            if (text.trim().length > 0) {
                loadMapFileContent(text, 'Pasted_Level');
            } else {
                applySelfDescribingMap(PRESET_KENNY_LEVEL_1, 'Level 1: Sunny Meadow');
            }
        } else {
            applySelfDescribingMap(PRESET_KENNY_LEVEL_1, 'Level 1: Sunny Meadow');
        }

        modal.classList.remove('open');
        closeBtn.style.display = 'block';
        showToast('Welcome to Map Studio!');
    };
}

function createBlankMap(cols, rows) {
    const lines = [];
    for (let r = 0; r < rows; r++) {
        if (r === rows - 3) {
            lines.push('...P' + '.'.repeat(cols - 4));
        } else if (r === rows - 2) {
            lines.push('#'.repeat(cols));
        } else if (r === rows - 1) {
            lines.push('B'.repeat(cols));
        } else {
            lines.push('.'.repeat(cols));
        }
    }
    initGridFromASCII(lines, `Custom_${cols}x${rows}`);
}

// ==========================================
// 11. TOOLBAR ACTIONS & EXPORTS
// ==========================================
function setActiveTool(tool) {
    EditorState.activeTool = tool;
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tool === tool);
    });
}

function setupToolbarAndPalette() {
    // Tool buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.onclick = () => setActiveTool(btn.dataset.tool);
    });

    // Palette Search Filter
    const searchInput = document.getElementById('palette-search');
    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (searchInput) {
        searchInput.oninput = (e) => {
            currentSearchTerm = e.target.value;
            if (clearSearchBtn) clearSearchBtn.style.display = currentSearchTerm ? 'block' : 'none';
            renderPaletteList();
        };
    }
    if (clearSearchBtn) {
        clearSearchBtn.onclick = () => {
            searchInput.value = '';
            currentSearchTerm = '';
            clearSearchBtn.style.display = 'none';
            renderPaletteList();
        };
    }

    // Zoom Controls
    document.getElementById('btn-zoom-in').onclick = () => {
        if (EditorState.zoom < 1.25) {
            EditorState.zoom = Math.round((EditorState.zoom + 0.25) * 100) / 100;
            document.getElementById('zoom-text').innerText = `${Math.round(EditorState.zoom * 100)}%`;
            resizeCanvas();
        }
    };

    document.getElementById('btn-zoom-out').onclick = () => {
        if (EditorState.zoom > 0.25) {
            EditorState.zoom = Math.round((EditorState.zoom - 0.25) * 100) / 100;
            document.getElementById('zoom-text').innerText = `${Math.round(EditorState.zoom * 100)}%`;
            resizeCanvas();
        }
    };

    // Grid & Coords Overlays
    document.getElementById('chk-grid').onchange = (e) => {
        EditorState.showGrid = e.target.checked;
        requestRender();
    };
    document.getElementById('chk-coords').onchange = (e) => {
        EditorState.showCoords = e.target.checked;
        requestRender();
    };

    // Undo / Redo
    document.getElementById('btn-undo').onclick = undo;
    document.getElementById('btn-redo').onclick = redo;

    // Code Drawer
    const drawer = document.getElementById('code-drawer');
    document.getElementById('btn-toggle-code').onclick = () => {
        drawer.classList.toggle('open');
        syncCodeDrawerText();
    };
    document.getElementById('btn-drawer-close').onclick = () => drawer.classList.remove('open');
    document.getElementById('btn-drawer-apply').onclick = () => {
        const text = document.getElementById('code-textarea').value;
        loadMapFileContent(text, EditorState.currentMapName);
        showToast('Map updated from code drawer!');
    };
    document.getElementById('btn-drawer-copy').onclick = copyMapCode;
    document.getElementById('btn-copy-code').onclick = copyMapCode;

    // Save / Export Dropdown Controller
    const exportDropdownWrapper = document.querySelector('.dropdown-wrapper');
    const exportDropdownBtn = document.getElementById('btn-export-dropdown');
    const exportMenu = document.getElementById('export-menu');
    let closeDropdownTimeout = null;

    function openExportMenu() {
        if (closeDropdownTimeout) {
            clearTimeout(closeDropdownTimeout);
            closeDropdownTimeout = null;
        }
        if (exportDropdownWrapper) exportDropdownWrapper.classList.add('open');
        if (exportMenu) exportMenu.classList.add('show');
    }

    function scheduleCloseExportMenu(delay = 180) {
        if (closeDropdownTimeout) clearTimeout(closeDropdownTimeout);
        closeDropdownTimeout = setTimeout(() => {
            if (exportDropdownWrapper) exportDropdownWrapper.classList.remove('open');
            if (exportMenu) exportMenu.classList.remove('show');
            closeDropdownTimeout = null;
        }, delay);
    }

    function closeExportMenuNow() {
        if (closeDropdownTimeout) {
            clearTimeout(closeDropdownTimeout);
            closeDropdownTimeout = null;
        }
        if (exportDropdownWrapper) exportDropdownWrapper.classList.remove('open');
        if (exportMenu) exportMenu.classList.remove('show');
    }

    if (exportDropdownWrapper) {
        exportDropdownWrapper.addEventListener('mouseenter', openExportMenu);
        exportDropdownWrapper.addEventListener('mouseleave', () => scheduleCloseExportMenu(180));
    }

    if (exportDropdownBtn) {
        exportDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (exportMenu && exportMenu.classList.contains('show')) {
                closeExportMenuNow();
            } else {
                openExportMenu();
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (exportDropdownWrapper && !exportDropdownWrapper.contains(e.target)) {
            closeExportMenuNow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeExportMenuNow();
        }
    });

    // Drag-and-drop file loading directly on canvas / window
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => {
        if (e.target.closest('#setup-modal')) return;
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const name = file.name.toLowerCase();
            if (name.endsWith('.js') || name.endsWith('.txt') || name.endsWith('.json') || name.endsWith('.map')) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const mapName = file.name.replace(/\.[^/.]+$/, '');
                    loadMapFileContent(evt.target.result, mapName);
                };
                reader.readAsText(file);
            }
        }
    });

    // Export Options
    const exportTxtBtn = document.getElementById('btn-export-txt');
    if (exportTxtBtn) {
        exportTxtBtn.onclick = () => {
            closeExportMenuNow();
            exportMapFile('txt');
        };
    }

    const exportJsBtn = document.getElementById('btn-export-js');
    if (exportJsBtn) {
        exportJsBtn.onclick = () => {
            closeExportMenuNow();
            exportMapFile('js');
        };
    }

    setupEditIdentifierModal();
}

/**
 * Generate Unified Self-Describing Map Code
 */
function generateASCIIArrayCode(asModule = false) {
    const tiles = tileRegistry.getAllTiles().filter(t => !t.isAir);
    const airTile = tileRegistry.get('.');

    if (asModule) {
        let assetsObjStr = '';
        if (airTile && airTile.filename) {
            assetsObjStr += `        "${airTile.char}": "${airTile.filename}",\n`;
        }
        tiles.forEach((t, i) => {
            const comma = i < tiles.length - 1 ? ',' : '';
            const file = t.filename || `${t.name.toLowerCase().replace(/\s+/g, '_')}.png`;
            assetsObjStr += `        "${t.char}": "${file}"${comma}\n`;
        });

        let gridRowsStr = '';
        EditorState.grid.forEach((row, idx) => {
            const line = row.join('');
            const comment = `/* ${idx.toString().padStart(2, ' ')} */ `;
            const comma = idx < EditorState.grid.length - 1 ? ',' : '';
            gridRowsStr += `        ${comment}"${line}"${comma}\n`;
        });

        let out = `/**\n * ${EditorState.currentMapName} Map Module\n * Unified Self-Describing Map Format\n */\n`;
        out += `window.CURRENT_LEVEL_MAP = {\n`;
        out += `    name: "${EditorState.currentMapName}",\n`;
        out += `    tileSize: ${TILE_SIZE},\n`;
        out += `    assets: {\n${assetsObjStr}    },\n`;
        out += `    grid: [\n${gridRowsStr}    ]\n`;
        out += `};\n`;
        out += `window.CURRENT_TURBO_MAP = window.CURRENT_LEVEL_MAP;\n`;
        return out;
    }

    // Raw .txt format with self-describing metadata header
    let legend = `// ==========================================\n// Level Map: ${EditorState.currentMapName}\n// Tile Size: ${TILE_SIZE}px\n// Dimensions: ${EditorState.cols} cols x ${EditorState.rows} rows\n// ==========================================\n// TILE IDENTIFIERS & ASSETS:\n`;
    if (airTile && airTile.filename) {
        legend += `// [ . ] Air / Clear -> ${airTile.filename}\n`;
    } else {
        legend += `// [ . ] Air / Clear\n`;
    }
    tiles.forEach(t => {
        const fileStr = t.filename ? ` -> ${t.filename}` : '';
        const catStr = t.category ? ` (${t.category.name})` : '';
        legend += `// [ ${t.char} ] ${t.name}${fileStr}${catStr}\n`;
    });
    legend += `// ==========================================\n\n`;

    let out = legend + `const ${EditorState.currentMapName.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_ASCII = [\n`;
    EditorState.grid.forEach((row, idx) => {
        const line = row.join('');
        const comment = `/* ${idx.toString().padStart(2, ' ')} */ `;
        const comma = idx < EditorState.grid.length - 1 ? ',' : '';
        out += `${comment}"${line}"${comma}\n`;
    });
    out += '];\n';
    return out;
}

function syncCodeDrawerText() {
    const textarea = document.getElementById('code-textarea');
    if (textarea) {
        textarea.value = generateASCIIArrayCode(true);
    }
}

function copyMapCode() {
    const code = generateASCIIArrayCode(true);
    navigator.clipboard.writeText(code).then(() => {
        showToast('📋 Self-Describing Map Code copied to clipboard!');
    }).catch(() => {
        const textarea = document.getElementById('code-textarea');
        textarea.value = code;
        textarea.select();
        document.execCommand('copy');
        showToast('📋 Self-Describing Map Code copied to clipboard!');
    });
}

function exportMapFile(ext = 'txt') {
    const text = generateASCIIArrayCode(ext === 'js');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${EditorState.currentMapName}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`💾 Saved ${EditorState.currentMapName}.${ext}!`);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }
}

// ==========================================
// 12. BOOTSTRAP INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    setupToolbarAndPalette();
    setupWizardInteractions();
    assets.loadDefaultRepoAssets();
});
