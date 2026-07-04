import { skeleton } from '../../utils';

const Footer = ({
  content,
  loading,
}: {
  content: string | null;
  loading: boolean;
}) => {
  if (!content) return null;

  return (
    <div className="card-body">
      {loading ? (
        skeleton({ widthCls: 'w-52', heightCls: 'h-6' })
      ) : (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: footer content is provided by the site owner and intentionally rendered as HTML
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
};

export default Footer;
