import ShowMore from '@/components/level-1/ShowMore';
import Tag from '@/components/level-1/Tag';
import LikeCounter from '@/components/level-2/LikeCounter';
import RendererSpring from '@/components/level-2/RendererSpring';

function DiaryDetail() {
  const handleEdit = () => {
    console.log('수정 완~');
  };

  const handleDelete = () => {
    console.log('삭제 완~');
  };

  return (
    <div className="flex-grow">
      <RendererSpring />
      <LikeCounter />
      <ShowMore onEdit={handleEdit} onDelete={handleDelete} />
      <Tag tagText="야무쌤안녕하세요" />
    </div>
  );
}

export default DiaryDetail;
