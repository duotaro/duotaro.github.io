const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto"></div>
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;