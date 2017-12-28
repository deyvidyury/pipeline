var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// MUXpc
strokeTrapeze(ctx, 215, 20, 40, 10);

line(ctx, 235, 30, 235, 60, 3);

// Program counter
Rect(ctx, 170, 60, 130, 30);

// Instruction memory
Rect(ctx, 20, 120, 130, 100);

// Plus one
Rect(ctx, 270, 150, 30, 30);

line(ctx, 235, 90, 235, 240, 3);
line(ctx, 150, 165, 270, 165, 3);

// IF-ID registers
line(ctx, 0, 255, window.innerWidth, 255, 1);
Rect(ctx, 20, 240, 130, 30);
Rect(ctx, 170, 240, 130, 30);