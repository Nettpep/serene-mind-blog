'use client'

import React, { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { SiLine } from 'react-icons/si';
import { useDictionary } from '@/lib/use-dictionary';

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
    const { dict } = useDictionary();
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState<string>(url);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            setShareUrl(window.location.href);
        }
    }, []);

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || title);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description || title,
                    url: shareUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    };

    const ShareButton = ({
        href,
        icon: Icon,
        label,
        bgColor,
        hoverColor,
        iconSize = 18
    }: {
        href?: string;
        icon: any;
        label: string;
        bgColor: string;
        hoverColor: string;
        iconSize?: number;
        onClick?: () => void;
    }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${bgColor} ${hoverColor} text-white font-medium text-sm shadow-sm hover:shadow-md hover:scale-105`}
            aria-label={`Share on ${label}`}
        >
            <Icon size={iconSize} className="flex-shrink-0" />
            <span className="hidden sm:inline">{label}</span>
        </a>
    );

    if (!dict) return null;

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-zen-muted font-bold">
                {dict.post.sharePost}
            </h3>

            <div className="flex flex-wrap gap-3">
                {/* Facebook */}
                <ShareButton
                    href={shareLinks.facebook}
                    icon={FaFacebookF}
                    label="Facebook"
                    bgColor="bg-[#1877F2]"
                    hoverColor="hover:bg-[#0c63d4]"
                    iconSize={16}
                />

                {/* X (Twitter) */}
                <ShareButton
                    href={shareLinks.twitter}
                    icon={FaXTwitter}
                    label="X"
                    bgColor="bg-[#000000]"
                    hoverColor="hover:bg-[#1a1a1a]"
                    iconSize={16}
                />

                {/* Line */}
                <ShareButton
                    href={shareLinks.line}
                    icon={SiLine}
                    label="Line"
                    bgColor="bg-[#00B900]"
                    hoverColor="hover:bg-[#009900]"
                    iconSize={18}
                />

                {/* Copy Link */}
                <button
                    onClick={handleCopyLink}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md ${copied
                        ? 'bg-green-500 text-white'
                        : 'bg-zen-accent text-white hover:bg-zen-accent/80'
                        }`}
                    aria-label="Copy link"
                >
                    {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                    <span className="hidden sm:inline">
                        {copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
                    </span>
                </button>

                {/* Native Share (Mobile) */}
                {isClient && typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                        onClick={handleNativeShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm shadow-sm hover:shadow-md lg:hidden"
                        aria-label="Share"
                    >
                        <Share2 size={18} />
                        <span>{dict.share.share}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShareButtons;
