import UrlCard from "./UrlCard";

export default function UserUrls({ urls = [], onCopy, onDelete, copiedId }) {
  if (urls.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>You haven’t created any URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6 max-h-[25vh] overflow-y-auto pr-2">
      {urls.map((url) => (
        <UrlCard
          key={url._id || url.short_url}
          url={url}
          copiedId={copiedId}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}