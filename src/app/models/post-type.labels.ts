// post-type.labels.ts
import { PostType } from './post-type.enum';

export const POST_TYPE_LABELS: Record<PostType, string> = {
  [PostType.Article]: 'Article — مقالات متخصصة',
  [PostType.News]: 'News — أخبار عامة / داخلية',
  [PostType.Blog]: 'Blog — تدوينات خفيفة',
  [PostType.Event]: 'Event — فعاليات أو مؤتمرات',
  [PostType.JobPost]: 'Job Post — فرص عمل وتوظيف',
  [PostType.Interview]: 'Interview — لقاءات مع خبراء أو موظفين',
  [PostType.Announcement]: 'Announcement — إعلانات رسمية',
  [PostType.Workshop]: 'Workshop — ورش عمل أو تدريبات',
  [PostType.Tip]: 'Tip — نصائح سريعة / Best Practices',
  [PostType.Quote]: 'Quote — اقتباسات تحفيزية/ملهمة',
  [PostType.BehindTheScenes]: 'Behind The Scenes — كواليس الشركة/الفريق',
  [PostType.ProductLaunch]: 'Product Launch — إطلاق منتج جديد',
};

// مصدر جاهز للقالب
export const POST_TYPE_OPTIONS: Array<{ value: PostType; label: string }> =
  (Object.keys(POST_TYPE_LABELS) as unknown as PostType[]).map(v => ({
    value: v, label: POST_TYPE_LABELS[v]
  }));
