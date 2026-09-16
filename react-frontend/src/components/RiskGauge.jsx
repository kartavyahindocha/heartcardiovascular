import React, { useEffect, useRef } from 'react';

export default function RiskGauge({ score = 0, level = "Low" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const strokeColor = level === 'Low' ? '#10b981' : level === 'Moderate' ? '#f59e0b' : '#ef4444';
    const targetScore = Math.min(Math.max(score, 0), 100);

    let currentScore = 0;
    const centerX = canvas.width / 2;
    const centerY = 135;
    const radius = 95;
    let animationFrameId;

    const drawGauge = (val) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
      ctx.lineWidth = 16;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      // Colored Score Arc
      const currentAngle = Math.PI + (val / 100) * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, currentAngle, false);
      ctx.lineWidth = 16;
      ctx.strokeStyle = strokeColor;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Needle
      const needleLength = 70;
      const needleX = centerX + needleLength * Math.cos(currentAngle);
      const needleY = centerY + needleLength * Math.sin(currentAngle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(needleX, needleY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Pivot Dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    };

    const animateGauge = () => {
      if (currentScore < targetScore) {
        currentScore += (targetScore - currentScore) * 0.08 + 0.15;
        if (currentScore > targetScore) currentScore = targetScore;
        drawGauge(currentScore);
        animationFrameId = requestAnimationFrame(animateGauge);
      } else {
        drawGauge(targetScore);
      }
    };

    animateGauge();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [score, level]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <canvas ref={canvasRef} width={280} height={160} className="mx-auto" />
      <div className="text-center -mt-2">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          Calculated Risk Gauge
        </span>
      </div>
    </div>
  );
}
