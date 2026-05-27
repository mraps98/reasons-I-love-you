/**
 * '101 Things I Love About You' - Application Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if loveItems are successfully loaded
  if (typeof loveItems === "undefined") {
    console.error("loveItems data is not loaded. Please make sure items.js is referenced correctly.");
    return;
  }

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  const state = {
    activeCategory: "all",
    activeView: "mosaic", // 'mosaic' or 'timeline'
    exploredItems: new Set(),
    currentCardId: 1,
    isAudioPlaying: false
  };

  // Load explored progress from localStorage
  const loadProgress = () => {
    const saved = localStorage.getItem("love_items_explored");
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        ids.forEach(id => state.exploredItems.add(id));
      } catch (e) {
        console.error("Failed to parse progress:", e);
      }
    }
  };

  const saveProgress = (id) => {
    state.exploredItems.add(id);
    localStorage.setItem("love_items_explored", JSON.stringify([...state.exploredItems]));
    updateDashboardProgress();
    
    // Mark card as read in UI
    const gridCard = document.querySelector(`.mosaic-card[data-id="${id}"]`);
    if (gridCard) gridCard.classList.add("read");
    
    const timelineCard = document.querySelector(`.timeline-item[data-id="${id}"]`);
    if (timelineCard) timelineCard.classList.add("read");

    const jumpNode = document.querySelector(`.jump-node[data-id="${id}"]`);
    if (jumpNode) jumpNode.classList.add("explored");
  };

  // Initialize progress
  loadProgress();

  // ==========================================================================
  // DOM ELEMENT CACHE
  // ==========================================================================
  const dom = {
    greetingScreen: document.getElementById("greeting-screen"),
    envelopeWrapper: document.querySelector(".envelope-wrapper"),
    proceedBtn: document.getElementById("proceed-btn"),
    mainContent: document.getElementById("main-content"),
    
    // Dashboard Progress
    progressText: document.getElementById("progress-count"),
    progressFill: document.getElementById("progress-bar"),
    
    // View Toggles & Pills
    mosaicView: document.getElementById("mosaic-view"),
    timelineView: document.getElementById("timeline-view"),
    mosaicBtn: document.getElementById("view-mosaic-btn"),
    timelineBtn: document.getElementById("view-timeline-btn"),
    filterContainer: document.getElementById("filter-pills"),
    
    // Dialog / Lightbox
    cardDialog: document.getElementById("card-dialog"),
    dialogCloseBtn: document.getElementById("dialog-close-btn"),
    dialogIndex: document.getElementById("dialog-index"),
    dialogPhoto: document.getElementById("dialog-photo"),
    dialogFallback: document.getElementById("dialog-fallback-art"),
    dialogCategory: document.getElementById("dialog-category"),
    dialogTitle: document.getElementById("dialog-title"),
    dialogDesc: document.getElementById("dialog-desc"),
    dialogPrevBtn: document.getElementById("dialog-prev-btn"),
    dialogNextBtn: document.getElementById("dialog-next-btn"),
    dialogJumpBtn: document.getElementById("dialog-jump-btn"),
    
    // Jump Drawer
    quickJumpPanel: document.getElementById("quick-jump-panel"),
    quickJumpGrid: document.getElementById("quick-jump-grid"),
    
    // Utilities
    surpriseBtn: document.getElementById("surprise-btn"),
    soundBtn: document.getElementById("sound-btn"),
    confettiOverlay: document.getElementById("confetti-overlay")
  };

  // ==========================================================================
  // AMBIENT PARTICLES SYSTEM (CANVAS CANVAS)
  // ==========================================================================
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let canvasAnimationId = null;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // Spread initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.opacity = Math.random() * 0.4 + 0.15;
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = Math.random() * 0.02 - 0.01;
      this.type = Math.random() > 0.45 ? "heart" : "sparkle";
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.2;
      this.angle += this.spinSpeed;
      
      // Fade out near top
      if (this.y < 100) {
        this.opacity -= 0.005;
      }
      
      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.type === "heart" ? "#db90a0" : "#e2c067";
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.type === "heart" ? "rgba(219, 144, 160, 0.4)" : "rgba(226, 192, 103, 0.4)";

      if (this.type === "heart") {
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.scale(this.size / 10, this.size / 10);
        ctx.moveTo(0, -3);
        ctx.bezierCurveTo(-2, -7, -7, -7, -7, -2);
        ctx.bezierCurveTo(-7, 2, -2, 6, 0, 9);
        ctx.bezierCurveTo(2, 6, 7, 2, 7, -2);
        ctx.bezierCurveTo(7, -7, 2, -7, 0, -3);
        ctx.fill();
      } else {
        // Draw sparkle star
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(0, -this.size);
          ctx.lineTo(this.size * 0.2, -this.size * 0.2);
          ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  const initParticles = () => {
    particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    canvasAnimationId = requestAnimationFrame(animateParticles);
  };

  // ==========================================================================
  // PROCEDURAL AMBIENT MUSIC (WEB AUDIO API SYNTHESIZER)
  // ==========================================================================
  let audioCtx = null;
  let synthInterval = null;

  const playAmbientNotes = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Gentle, romantic F# major/Eb minor pentatonic scale for cozy box chimes
    const chimesScale = [185.00, 207.65, 233.08, 277.18, 311.13, 369.99, 415.30, 466.16, 554.37, 622.25];
    
    // Procedural chime generator
    const playChime = () => {
      if (!state.isAudioPlaying) return;

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      // Soft sine/triangle blend for cozy bell chimes
      osc.type = Math.random() > 0.6 ? "sine" : "triangle";
      
      // Random note from the pentatonic scale
      const noteFreq = chimesScale[Math.floor(Math.random() * chimesScale.length)];
      osc.frequency.value = noteFreq;

      // Soft lowpass filter to remove digital harshness
      filter.type = "lowpass";
      filter.frequency.value = 1200;

      // Gentle gain envelope (slow attack, long decay like physical bell)
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(Math.random() * 0.08 + 0.04, audioCtx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.0);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.2);
    };

    // Play initial chimes immediately
    setTimeout(playChime, 100);
    setTimeout(playChime, 800);

    // Schedule regular gentle, drifting chimes
    synthInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        playChime();
        // Occasional double chime for harmony
        if (Math.random() > 0.7) {
          setTimeout(playChime, Math.random() * 400 + 200);
        }
      }
    }, 1800);
  };

  const stopAmbientMusic = () => {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  };

  const handleSoundToggle = () => {
    state.isAudioPlaying = !state.isAudioPlaying;
    
    if (state.isAudioPlaying) {
      dom.soundBtn.classList.add("playing");
      dom.soundBtn.setAttribute("title", "Mute Chimes");
      playAmbientNotes();
    } else {
      dom.soundBtn.classList.remove("playing");
      dom.soundBtn.setAttribute("title", "Play Chimes");
      stopAmbientMusic();
    }
  };

  dom.soundBtn.addEventListener("click", handleSoundToggle);

  // ==========================================================================
  // DYNAMIC COMPONENT RENDERERS
  // ==========================================================================
  
  // Update dashboard progress trackers
  const updateDashboardProgress = () => {
    const total = loveItems.length;
    const readCount = state.exploredItems.size;
    const percentage = total > 0 ? (readCount / total) * 100 : 0;
    
    dom.progressText.textContent = `${readCount} / ${total} Explored`;
    dom.progressFill.style.width = `${percentage}%`;
  };

  // Get localized display names for categories
  const getCategoryLabel = (cat) => {
    const labels = {
      personality: "✨ Personality",
      details: "🌸 Little Details",
      memories: "❤️ Memories",
      future: "💫 Future & Dreams"
    };
    return labels[cat] || cat;
  };

  // Render Grid (Mosaic) View
  const renderMosaicView = () => {
    dom.mosaicView.innerHTML = "";
    
    loveItems.forEach(item => {
      const isRead = state.exploredItems.has(item.id);
      
      const card = document.createElement("div");
      card.className = `mosaic-card${isRead ? " read" : ""}`;
      card.dataset.id = item.id;
      card.dataset.category = item.category;
      
      // Formatting number as 01, 02...
      const paddedNum = String(item.id).padStart(2, "0");
      
      card.innerHTML = `
        <div class="card-heart-indicator">❤</div>
        <div class="mosaic-card-num">${paddedNum}</div>
        <div class="mosaic-card-title">${item.title}</div>
      `;
      
      card.addEventListener("click", () => {
        openCardModal(item.id);
      });
      
      dom.mosaicView.appendChild(card);
    });
  };

  // Render Scroll (Timeline) View
  const renderTimelineView = () => {
    dom.timelineView.innerHTML = `
      <div class="timeline-path"></div>
    `;
    
    loveItems.forEach(item => {
      const isRead = state.exploredItems.has(item.id);
      
      const timelineItem = document.createElement("div");
      timelineItem.className = `timeline-item${isRead ? " read" : ""}`;
      timelineItem.dataset.id = item.id;
      timelineItem.dataset.category = item.category;
      
      const paddedNum = String(item.id).padStart(2, "0");
      
      timelineItem.innerHTML = `
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <div class="timeline-card-header">
            <span class="timeline-card-num">#${paddedNum}</span>
            <span class="timeline-card-category">${getCategoryLabel(item.category)}</span>
          </div>
          <h3 class="timeline-card-title">${item.title}</h3>
          <p class="timeline-card-desc">${item.description}</p>
          <span class="timeline-card-more">Read Love Note &rarr;</span>
        </div>
      `;
      
      timelineItem.querySelector(".timeline-card").addEventListener("click", () => {
        openCardModal(item.id);
      });
      
      dom.timelineView.appendChild(timelineItem);
    });

    // Re-initialize intersection observers for scroll-reveals
    setupScrollReveals();
  };

  // Scroll Reveal Animations for Timeline Cards
  let revealObserver = null;
  const setupScrollReveals = () => {
    if (revealObserver) {
      revealObserver.disconnect();
    }

    const items = document.querySelectorAll(".timeline-item");
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px" // Reveal slightly before center
    });

    items.forEach(item => revealObserver.observe(item));
  };

  // Initialize both views
  renderMosaicView();
  renderTimelineView();
  updateDashboardProgress();

  // ==========================================================================
  // NAVIGATION & VIEW SWITCHERS
  // ==========================================================================
  
  const switchView = (targetView) => {
    state.activeView = targetView;
    
    if (targetView === "mosaic") {
      dom.mosaicBtn.classList.add("active");
      dom.timelineBtn.classList.remove("active");
      dom.mosaicView.style.display = "grid";
      dom.timelineView.style.display = "none";
    } else {
      dom.timelineBtn.classList.add("active");
      dom.mosaicBtn.classList.remove("active");
      dom.mosaicView.style.display = "none";
      dom.timelineView.style.display = "block";
      // Refresh reveals when switching
      setupScrollReveals();
    }
    // Maintain active category filter
    applyCategoryFilter(state.activeCategory);
  };

  dom.mosaicBtn.addEventListener("click", () => switchView("mosaic"));
  dom.timelineBtn.addEventListener("click", () => switchView("timeline"));

  // Category Filtering
  const applyCategoryFilter = (category) => {
    state.activeCategory = category;
    
    // Update active pill button state
    document.querySelectorAll(".pill-btn").forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Filter Mosaic Cards
    const mosaicCards = document.querySelectorAll(".mosaic-card");
    mosaicCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    // Filter Timeline Items
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach(item => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    if (state.activeView === "timeline") {
      setupScrollReveals();
    }
  };

  // Setup Dynamic Filter Pill Clicks
  dom.filterContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".pill-btn");
    if (pill) {
      applyCategoryFilter(pill.dataset.category);
    }
  });

  // Default to showing grid view, and hiding timeline
  dom.timelineView.style.display = "none";

  // ==========================================================================
  // PROGRESSIVE CARD MODAL / LIGHTBOX
  // ==========================================================================
  
  // Progressive Multi-Format Loader
  const loadModalMedia = (id) => {
    // Hide components & show fallback initially
    dom.dialogPhoto.style.display = "none";
    dom.dialogPhoto.classList.remove("loaded");
    dom.dialogFallback.style.display = "flex";

    // Supported formats list (sequentially checks them)
    const extensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
    let formatIndex = 0;

    const tryNextExtension = () => {
      if (formatIndex >= extensions.length) {
        // All extensions checked, no photo exists. Display beautiful fallback.
        return;
      }

      const ext = extensions[formatIndex];
      const targetSrc = `assets/images/${id}.${ext}`;
      const tempImg = new Image();

      tempImg.onload = () => {
        // Image loaded successfully! Render it
        dom.dialogPhoto.src = targetSrc;
        dom.dialogPhoto.style.display = "block";
        dom.dialogFallback.style.display = "none";
        // Trigger smooth fade-in
        setTimeout(() => {
          dom.dialogPhoto.classList.add("loaded");
        }, 50);
      };

      tempImg.onerror = () => {
        // Failed, try the next format
        formatIndex++;
        tryNextExtension();
      };

      tempImg.src = targetSrc;
    };

    tryNextExtension();
  };

  // Open card modal and fill data
  const openCardModal = (id) => {
    const item = loveItems.find(i => i.id === id);
    if (!item) return;

    state.currentCardId = id;

    // Reset jump drawer state
    dom.quickJumpPanel.classList.remove("active");

    // Populate index & category
    dom.dialogIndex.textContent = `Reason ${id} of 101`;
    dom.dialogCategory.textContent = getCategoryLabel(item.category);
    dom.dialogTitle.textContent = item.title;
    dom.dialogDesc.textContent = item.description;

    // Load photo or display beautiful vector graphic
    loadModalMedia(id);

    // Save read state to local storage & progress tracker
    saveProgress(id);

    // Render/refresh quick jump selector nodes
    updateQuickJumpCurrentNode(id);

    // Open Modal standard native routine
    if (!dom.cardDialog.open) {
      dom.cardDialog.showModal();
    }
  };

  const closeCardModal = () => {
    dom.cardDialog.close();
    dom.quickJumpPanel.classList.remove("active");
  };

  dom.dialogCloseBtn.addEventListener("click", closeCardModal);
  
  // Close on clicking modal backdrop
  dom.cardDialog.addEventListener("click", (e) => {
    const rect = dom.cardDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && 
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && 
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeCardModal();
    }
  });

  // Sequences Next/Prev
  const navigateCard = (offset) => {
    let nextId = state.currentCardId + offset;
    if (nextId > 101) nextId = 1;
    if (nextId < 1) nextId = 101;
    
    // Quick fade morph transition
    dom.cardDialog.style.transform = "scale(0.98) translateY(10px)";
    dom.cardDialog.style.opacity = "0.7";
    
    setTimeout(() => {
      openCardModal(nextId);
      dom.cardDialog.style.transform = "scale(1) translateY(0)";
      dom.cardDialog.style.opacity = "1";
    }, 150);
  };

  dom.dialogPrevBtn.addEventListener("click", () => navigateCard(-1));
  dom.dialogNextBtn.addEventListener("click", () => navigateCard(1));

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (dom.cardDialog.open) {
      if (e.key === "ArrowRight") navigateCard(1);
      if (e.key === "ArrowLeft") navigateCard(-1);
    }
  });

  // ==========================================================================
  // QUICK-JUMP DRAWER PANEL
  // ==========================================================================
  
  // Generate jump items once on start
  const buildQuickJumpGrid = () => {
    dom.quickJumpGrid.innerHTML = "";
    
    for (let i = 1; i <= 101; i++) {
      const isExplored = state.exploredItems.has(i);
      
      const node = document.createElement("button");
      node.className = `jump-node${isExplored ? " explored" : ""}`;
      node.dataset.id = i;
      node.textContent = i;
      
      node.addEventListener("click", () => {
        openCardModal(i);
      });
      
      dom.quickJumpGrid.appendChild(node);
    }
  };

  const updateQuickJumpCurrentNode = (activeId) => {
    document.querySelectorAll(".jump-node").forEach(node => {
      const nodeId = parseInt(node.dataset.id);
      node.classList.remove("current");
      
      if (nodeId === activeId) {
        node.classList.add("current");
        // Scroll into view if out of bounds inside grid
        node.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  };

  // Toggle drawer visibility
  dom.dialogJumpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dom.quickJumpPanel.classList.toggle("active");
  });

  // Build the nodes grid
  buildQuickJumpGrid();

  // ==========================================================================
  // SURPRISE CONFETTI GENERATOR & RANDOM PICKER
  // ==========================================================================
  
  const createConfettiBurst = () => {
    const colors = ["#db90a0", "#e2c067", "#e65c7b", "#fae3b4", "#f7efff", "#f0788c"];
    const shapes = ["circle", "triangle", "square", "heart"];
    
    dom.confettiOverlay.innerHTML = "";
    const count = 90;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "confetti-particle";
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      p.style.backgroundColor = color;
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `-20px`;
      
      // Speed, sizes, rotations
      const size = Math.random() * 8 + 5;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      
      if (shape === "circle") {
        p.style.borderRadius = "50%";
      } else if (shape === "triangle") {
        p.style.backgroundColor = "transparent";
        p.style.borderLeft = `${size / 2}px solid transparent`;
        p.style.borderRight = `${size / 2}px solid transparent`;
        p.style.borderBottom = `${size}px solid ${color}`;
        p.style.width = "0";
        p.style.height = "0";
      } else if (shape === "heart") {
        p.style.backgroundColor = "transparent";
        p.innerHTML = "❤";
        p.style.color = color;
        p.style.fontSize = `${size + 4}px`;
      }
      
      // Animation values
      const delay = Math.random() * 0.4;
      const duration = Math.random() * 2 + 1.5;
      const rotation = Math.random() * 360;
      
      p.style.animationDelay = `${delay}s`;
      p.style.animationDuration = `${duration}s`;
      
      // Horizontal drift
      p.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${rotation}deg)`;
      
      dom.confettiOverlay.appendChild(p);
    }

    // Clear DOM after fallback animations
    setTimeout(() => {
      dom.confettiOverlay.innerHTML = "";
    }, 4000);
  };

  // Pick a random unread card (or any card if all are read)
  const surpriseMe = () => {
    // Collect unread cards
    let pool = loveItems.filter(item => !state.exploredItems.has(item.id));
    
    // If she read all of them, use full pool
    if (pool.length === 0) {
      pool = loveItems;
    }

    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    
    // Trigger confetti explosion
    createConfettiBurst();

    // Small delay for anticipation
    setTimeout(() => {
      openCardModal(randomItem.id);
    }, 450);
  };

  dom.surpriseBtn.addEventListener("click", surpriseMe);

  // ==========================================================================
  // ENVELOPE OPENING ANIMATION SEQUENCE
  // ==========================================================================
  
  const openEnvelopeSequence = () => {
    if (dom.envelopeWrapper.classList.contains("open")) return;
    
    dom.envelopeWrapper.classList.add("open");
    
    // Web Audio Activation (unlocks on gesture to satisfy browser policies)
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const proceedToMainContent = (e) => {
    if (e) {
      e.stopPropagation(); // Prevent bubble trigger
    }
    
    dom.greetingScreen.classList.add("fade-out");
    dom.mainContent.classList.add("visible");
    
    // Initialize layout systems and active canvas routines
    initParticles();
    animateParticles();
    
    // Trigger soft piano chimes swell right when she enters!
    state.isAudioPlaying = true;
    dom.soundBtn.classList.add("playing");
    dom.soundBtn.setAttribute("title", "Mute Chimes");
    playAmbientNotes();
  };

  dom.envelopeWrapper.addEventListener("click", openEnvelopeSequence);
  dom.proceedBtn.addEventListener("click", proceedToMainContent);

  // Debug skip greeting screen (uncomment if testing)
  // dom.greetingScreen.style.display = 'none';
  // dom.mainContent.classList.add('visible');
  // initParticles();
  // animateParticles();
});
