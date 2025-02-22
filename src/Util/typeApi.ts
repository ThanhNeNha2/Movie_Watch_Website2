export interface InfoPhim {
  imgMain: unknown;
  name: string; // Tên phim
  rank: string[]; // Top rank (3 giá trị string)
  evaluate: [number, number, string]; // Đánh giá gồm 2 số và 1 chuỗi
  kindPhim: string[]; // 3 loại thể loại phim
  description: string; // Mô tả phim
}
