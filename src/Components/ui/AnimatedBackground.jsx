import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
        };
        updateCanvasSize();

        const particles = [];
        const particleCount = 100;
        const maxDistance = 150;

        const isDarkMode = () => {
            const theme = document.documentElement.getAttribute("data-theme");
            if (theme) return theme === "dark";
            return document.documentElement.classList.contains("dark");
        };

        const createParticle = () => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2 + 1,

                update: function () {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                },

                draw: function () {
                    const isDark = isDarkMode();
                    ctx.fillStyle = isDark ? "rgba(147, 51, 234, 0.8)" : "rgba(147, 51, 234, 0.6)";
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fill();
                },
            };
        };

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        const drawConnections = () => {
            const isDark = isDarkMode();

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.5;
                        ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${opacity})` : `rgba(139, 92, 246, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            const isDark = isDarkMode();
            ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(249, 250, 251, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawConnections();

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        const isDark = isDarkMode();
        ctx.fillStyle = isDark ? "#0f172a" : "#f9fafb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        animate();

        const handleResize = () => {
            updateCanvasSize();
        };

        window.addEventListener("resize", handleResize);

        const observer = new MutationObserver(() => {
            const isDark = isDarkMode();
            ctx.fillStyle = isDark ? "#0f172a" : "#f9fafb";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme"],
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default AnimatedBackground;
