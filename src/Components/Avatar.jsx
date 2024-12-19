function Avatar({ h = 50, w = 50, src }) {
  const size = `${Math.min(h, w)}px`; // Ensure width and height are the same for a circular shape

  return (
    <div
      className="border rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        src={src || "/placeholder-avatar.png"}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Avatar;
