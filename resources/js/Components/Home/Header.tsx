import React from 'react';

export default function Header() {
    return (
        <header className="relative sticky top-0 z-50 overflow-hidden bg-white/80 shadow-sm backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <div className="text-2xl font-bold tracking-wide text-pink-700">
                    <div className="text-2xl font-bold tracking-wide text-pink-700">
                        <i className="fas fa-leaf mr-2 text-pink-500"></i>
                        VeloColla+ 
                    </div>
                </div>
                <div className="flex gap-3">
                   <a href="#pricing" className="btn btn-sm btn-outline btn-pink-600 hidden sm:flex">โปรโมชั่น</a>
                <a href="#order" className="btn btn-sm bg-pink-600 text-white border-0 hover:bg-pink-700 shadow-md">สั่งซื้อเลย</a>
                </div>
            </div>
        </header>
    );
}
