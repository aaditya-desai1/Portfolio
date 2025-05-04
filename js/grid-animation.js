/**
 * Interactive 3D Grid Animation
 * Creates a grid that bulges and deforms based on mouse position
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  
  // Full screen canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Grid settings
  const gridSize = 30; // Smaller grid size for denser grid
  const baseLineColor = 'rgba(255, 255, 255, 0.15)'; // Increased opacity for better visibility
  const accentColor = 'rgba(59, 130, 246, 0.25)'; // Blue accent color for hover area
  const bulgeStrength = 180; // Slightly increased for more visibility
  const bulgeSize = 600; // Increased for smoother effect
  
  // Mouse position with default values
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  
  // Target mouse position for smooth movement
  let targetX = mouseX;
  let targetY = mouseY;
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
  
  // Add touch support for mobile
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetX = e.touches[0].clientX;
      targetY = e.touches[0].clientY;
      e.preventDefault();
    }
  });
  
  // Calculate distortion at a point
  function distort(x, y) {
    const dx = x - mouseX;
    const dy = y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < bulgeSize) {
      // Create bulge effect based on distance with easing
      const strength = bulgeStrength * Math.pow(1 - distance / bulgeSize, 2);
      
      // Handle edge case to prevent division by zero
      if (distance === 0) {
        return { 
          x, 
          y,
          distortion: 1 // Max distortion value
        };
      }
      
      return {
        x: x + (dx / distance) * strength * 0.15,
        y: y + (dy / distance) * strength * 0.15,
        distortion: 1 - distance / bulgeSize // Normalized distortion value
      };
    }
    
    return { 
      x, 
      y,
      distortion: 0 // No distortion
    };
  }
  
  // Get color based on distortion amount
  function getColor(distortion) {
    if (distortion <= 0) return baseLineColor;
    
    // Blend between base color and accent color based on distortion
    return `rgba(${255 - 196 * distortion}, ${255 - 125 * distortion}, ${255 + 246 * distortion - 255}, ${0.15 + 0.1 * distortion})`;
  }
  
  // Draw the grid with bulge effect
  function drawGrid() {
    // Smooth mouse movement with easing
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1.2; // Increased line width
    
    // Calculate grid dimensions
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;
    
    // Draw vertical lines
    for (let i = 0; i < cols; i++) {
      const x = i * gridSize;
      ctx.beginPath();
      
      for (let j = 0; j <= rows; j++) {
        const y = j * gridSize;
        const point = distort(x, y);
        
        // Set color based on distortion
        if (j === 0) {
          ctx.strokeStyle = getColor(point.distortion);
          ctx.moveTo(point.x, point.y);
        } else {
          // Average distortion between points for smoother color transition
          const avgDistortion = (ctx.lastPoint ? (ctx.lastPoint.distortion + point.distortion) / 2 : point.distortion);
          ctx.strokeStyle = getColor(avgDistortion);
          ctx.lineTo(point.x, point.y);
          
          // Apply the stroke for each segment to get color gradient
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        }
        
        ctx.lastPoint = point;
      }
    }
    
    // Draw horizontal lines
    for (let j = 0; j < rows; j++) {
      const y = j * gridSize;
      ctx.beginPath();
      
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        const point = distort(x, y);
        
        // Set color based on distortion
        if (i === 0) {
          ctx.strokeStyle = getColor(point.distortion);
          ctx.moveTo(point.x, point.y);
        } else {
          // Average distortion between points for smoother color transition
          const avgDistortion = (ctx.lastPoint ? (ctx.lastPoint.distortion + point.distortion) / 2 : point.distortion);
          ctx.strokeStyle = getColor(avgDistortion);
          ctx.lineTo(point.x, point.y);
          
          // Apply the stroke for each segment to get color gradient
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        }
        
        ctx.lastPoint = point;
      }
    }
    
    requestAnimationFrame(drawGrid);
  }
  
  // Start animation
  drawGrid();
}); 