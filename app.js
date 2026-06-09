document.addEventListener('DOMContentLoaded', () => {
    // List of Emoji Fruits (8 unique pairs = 16 cards)
    const FRUIT_EMOJIS = ['🍓', '🍌', '🍇', '🍉', '🍊', '🍍', '🍒', '🥑'];
    const LOCAL_STORAGE_KEY = 'memory_game_leaderboard';

    // Game States
    let currentPlayer = '';
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let timerInterval = null;
    let startTime = null;
    let elapsedTime = 0; // in milliseconds
    let isGridLocked = false;
    let hasStartedTimer = false;

    // DOM Elements Selector
    const lobbyScreen = document.getElementById('lobby-screen');
    const gameScreen = document.getElementById('game-screen');
    const registerForm = document.getElementById('register-form');
    const usernameInput = document.getElementById('username');
    const leaderboardBody = document.getElementById('leaderboard-body');
    
    const displayUsername = document.getElementById('display-username');
    const gameTimer = document.getElementById('game-timer');
    const gameMatches = document.getElementById('game-matches');
    const gameGrid = document.getElementById('game-grid');
    
    const backToLobbyBtn = document.getElementById('back-to-lobby-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const victoryModal = document.getElementById('victory-modal');
    const victoryName = document.getElementById('victory-name');
    const victoryTime = document.getElementById('victory-time');
    const newRecordBadge = document.getElementById('new-record-badge');
    const modalPlayAgainBtn = document.getElementById('modal-play-again-btn');
    const modalLobbyBtn = document.getElementById('modal-lobby-btn');

    // Initialize Leaderboard display on start
    renderLeaderboard();

    // ===================================
    // EVENT LISTENERS
    // ===================================

    // 1. Submit Lobby Form
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputName = usernameInput.value.trim();
        if (!inputName) return;

        currentPlayer = inputName;
        displayUsername.textContent = currentPlayer;
        
        // Switch to Game Screen
        switchScreen(lobbyScreen, gameScreen);
        initGame();
    });

    // 2. Navigation & Utility Buttons
    backToLobbyBtn.addEventListener('click', () => {
        if (confirm('Adakah anda pasti mahu keluar? Kemajuan semasa akan hilang.')) {
            resetTimer();
            switchScreen(gameScreen, lobbyScreen);
            renderLeaderboard();
        }
    });

    restartBtn.addEventListener('click', () => {
        initGame();
    });

    // 3. Victory Modal Buttons
    modalPlayAgainBtn.addEventListener('click', () => {
        closeModal();
        initGame();
    });

    modalLobbyBtn.addEventListener('click', () => {
        closeModal();
        switchScreen(gameScreen, lobbyScreen);
        renderLeaderboard();
    });

    // ===================================
    // GAME LOGIC FUNCTIONS
    // ===================================

    // Initialize / Reset Board
    function initGame() {
        // Clear previous state
        gameGrid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        isGridLocked = false;
        hasStartedTimer = false;
        gameMatches.textContent = '0/8';
        
        resetTimer();

        // Generate 16 card array (8 pairs)
        const gameEmojis = [...FRUIT_EMOJIS, ...FRUIT_EMOJIS];
        shuffle(gameEmojis);

        // Build DOM Grid
        gameEmojis.forEach((emoji, index) => {
            const cardEl = createCardElement(emoji, index);
            gameGrid.appendChild(cardEl);
        });
    }

    // Fisher-Yates Shuffle
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create Card DOM Element
    function createCardElement(emoji, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = emoji;

        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        card.appendChild(cardInner);

        card.addEventListener('click', () => handleCardClick(card));

        return card;
    }

    // Handle Click On Card
    function handleCardClick(cardElement) {
        // Avoid clicks on locked grid, already flipped cards, or matched cards
        if (isGridLocked || cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
            return;
        }

        // Start timer on first card click
        if (!hasStartedTimer) {
            startTimer();
            hasStartedTimer = true;
        }

        // Flip Card
        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        // Check Match when 2 cards are selected
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    // Check Match
    function checkMatch() {
        isGridLocked = true;
        const [card1, card2] = flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found!
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                
                matchedPairs++;
                gameMatches.textContent = `${matchedPairs}/8`;
                
                flippedCards = [];
                isGridLocked = false;

                // Check Win Condition
                if (matchedPairs === 8) {
                    winGame();
                }
            }, 300); // Small delay before matched state glow triggers
        } else {
            // No match, flip back after 1 second
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                isGridLocked = false;
            }, 1000);
        }
    }

    // Win Game
    function winGame() {
        stopTimer();

        const timeSeconds = +(elapsedTime / 1000).toFixed(2);
        
        // Save to leaderboard
        const isNewRecord = saveScore(currentPlayer, timeSeconds);

        // Display results on Victory Modal
        victoryName.textContent = currentPlayer;
        victoryTime.textContent = `${timeSeconds}s`;

        if (isNewRecord) {
            newRecordBadge.classList.remove('hidden');
        } else {
            newRecordBadge.classList.add('hidden');
        }

        // Show Modal
        setTimeout(() => {
            victoryModal.classList.add('active');
        }, 500);
    }

    // ===================================
    // TIMER FUNCTIONS
    // ===================================

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTimerDisplay(elapsedTime);
        }, 100); // Updates every 100ms
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateTimerDisplay(0);
    }

    function updateTimerDisplay(ms) {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const tenths = Math.floor((ms % 1000) / 100);

        const minStr = String(minutes).padStart(2, '0');
        const secStr = String(seconds).padStart(2, '0');

        gameTimer.textContent = `${minStr}:${secStr}.${tenths}`;
    }

    // ===================================
    // LEADERBOARD FUNCTIONS
    // ===================================

    function getLeaderboard() {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    function saveScore(username, time) {
        const leaderboard = getLeaderboard();
        
        // Check if player already exists and if new time is better
        const existingEntryIndex = leaderboard.findIndex(entry => entry.username.toLowerCase() === username.toLowerCase());
        
        let isNewRecord = false;
        
        if (existingEntryIndex !== -1) {
            // Already played before
            if (time < leaderboard[existingEntryIndex].time_seconds) {
                leaderboard[existingEntryIndex].time_seconds = time;
                isNewRecord = true;
            }
        } else {
            // New player
            leaderboard.push({ username: username, time_seconds: time });
            isNewRecord = true;
        }

        // Sort ascending (faster is better)
        leaderboard.sort((a, b) => a.time_seconds - b.time_seconds);

        // Limit leaderboard entries to top 10
        const top10 = leaderboard.slice(0, 10);
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(top10));

        // Return true if this game time is indeed the personal best/new leaderboard entry
        return isNewRecord;
    }

    function renderLeaderboard() {
        const leaderboard = getLeaderboard();
        leaderboardBody.innerHTML = '';

        if (leaderboard.length === 0) {
            leaderboardBody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="3">Tiada rekod lagi. Jadilah yang pertama!</td>
                </tr>
            `;
            return;
        }

        leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            
            // Format rank prefix icons
            let rankText = index + 1;
            if (index === 0) rankText = '🥇';
            else if (index === 1) rankText = '🥈';
            else if (index === 2) rankText = '🥉';

            row.innerHTML = `
                <td class="rank-col">${rankText}</td>
                <td>${escapeHTML(entry.username)}</td>
                <td class="time-col">${entry.time_seconds.toFixed(2)}s</td>
            `;
            
            leaderboardBody.appendChild(row);
        });
    }

    // Screen navigation helper
    function switchScreen(fromScreen, toScreen) {
        fromScreen.classList.remove('active');
        toScreen.classList.add('active');
    }

    // Modal helpers
    function closeModal() {
        victoryModal.classList.remove('active');
    }

    // Escape user input utility
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
