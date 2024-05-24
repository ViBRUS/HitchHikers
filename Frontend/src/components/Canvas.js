import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Canvas = () => {
	const canvasRef = useRef(null);
	const headerRef = useRef(null);
  	const [animateHeader, setAnimateHeader] = useState(true);
  	const [points, setPoints] = useState([]);
  	const [target, setTarget] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  	const findClosestPoints = (points) => {
		for (let i = 0; i < points.length; i++) {
			const closest = [];
			const p1 = points[i];
			for (let j = 0; j < points.length; j++) {
				const p2 = points[j];
				if (p1 !== p2) {
					let placed = false;
					for (let k = 0; k < 5; k++) {
						if (!placed) {
							if (!closest[k]) {
								closest[k] = p2;
								placed = true;
							}
						}
					}

					for (let k = 0; k < 5; k++) {
						if (!placed) {
							if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
				}
			}
    		p1.closest = closest;
		}
	};

	const assignCircles = (points) => {
		for (const point of points) {
			const c = new Circle(point, 2 + Math.random() * 2, "rgba(255,255,255,0.3)");
			point.circle = c;
		}
	};

	const initAnimation = (ctx, pointsArray) => {
		const animate = () => {
			if (animateHeader) {
				ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
				for (const point of pointsArray) {
					if (Math.abs(getDistance(target, point)) < 4000) {
						point.active = 0.3;
						point.circle.active = 0.6;
					} else if (Math.abs(getDistance(target, point)) < 20000) {
						point.active = 0.1;
						point.circle.active = 0.3;
					} else if (Math.abs(getDistance(target, point)) < 40000) {
						point.active = 0.02;
						point.circle.active = 0.1;
					} else {
						point.active = 0;
						point.circle.active = 0;
					}

					drawLines(ctx, point);
					point.circle.draw(ctx);
				}
			}
			requestAnimationFrame(animate);
    	};
		
		animate();
		for (const point of pointsArray) {
			shiftPoint(point);
		}
  	};

	const createPoints = (width, height) => {
		const pointsArray = [];
		for (let x = 0; x < width; x += width / 20) {
			for (let y = 0; y < height; y += height / 20) {
				const px = x + (Math.random() * width) / 20;
				const py = y + (Math.random() * height) / 20;
				pointsArray.push({ x: px, originX: px, y: py, originY: py });
			}
		}
		return pointsArray;
	};

	const drawLines = (ctx, p) => {
		if (!p.active) return;
		for (const closestPoint of p.closest) {
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(closestPoint.x, closestPoint.y);
			ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
			ctx.stroke();
		}
	};

	const shiftPoint = (p) => {
		gsap.to(p, {
			duration: 1 + 1 * Math.random(),
			x: p.originX - 50 + Math.random() * 100,
			y: p.originY - 50 + Math.random() * 100,
			ease: "circ.inOut",
			onComplete: () => {
				shiftPoint(p);
			},
		});
	};

	const Circle = function (pos, rad, color) {
		this.pos = pos;
		this.radius = rad;
		this.color = color;

		this.draw = (ctx) => {
			if (!this.active) return;
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = `rgba(156,217,249,${this.active})`;
			ctx.fill();
		};
	};

	const getDistance = (p1, p2) => {
		return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	};
  
	useEffect(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const largeHeader = headerRef.current;
		largeHeader.style.height = `${height}px`;

		const canvas = canvasRef.current;
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");

		const pointsArray = createPoints(width, height);
		findClosestPoints(pointsArray);
		assignCircles(pointsArray);

		setPoints(pointsArray);

		const handleMouseMove = (e) => {
			const posx = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			const posy = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			setTarget({ x: posx, y: posy });
		};

		const handleScroll = () => {
			setAnimateHeader(document.body.scrollTop <= height);
		};

		const handleResize = () => {
			const newWidth = window.innerWidth;
			const newHeight = window.innerHeight;
			largeHeader.style.height = `${newHeight}px`;
			canvas.width = newWidth;
			canvas.height = newHeight;
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		initAnimation(ctx, pointsArray);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [target]);

	return (
		<div>
			<div id="large-header" ref={headerRef} className="large-header">
				<canvas id="demo-canvas" ref={canvasRef} className="demo-canvas"></canvas>
			</div>
		</div>
	);
};

export default Canvas;
