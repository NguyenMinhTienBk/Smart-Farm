import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import NewsItem from "../../components/NewsItem";
import TabBar from "../../components/TabBar";

const newsData = [
  {
    id: "1",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2023/04/18/danhbatcangudaiduong-168177835-2302-2560-1681778576.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=aBRX4OSqhhw2eImbjVqZsQ",
    title:
      "Thủ tướng phê bình bốn địa phương để tái diễn vi phạm khai thác thuỷ sản",
    content:
      "Bình Định, Khánh Hòa, Bình Thuận, Kiên Giang bị phê bình vì để tàu cá vi phạm vùng biển nước ngoài từ đầu năm 2023 đến nay",
  },
  {
    id: "2",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2023/04/01/xexephangoQL1cholencuakhau303-7161-4757-1680351726.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=hIjnbsKvpPt4HFJkUALc0A",
    title: "Trung Quốc tăng thời gian thông quan tại cửa khẩu",
    content:
      "Thời gian thông quan hàng hoá với phía Trung Quốc được tăng một giờ so với bình thường, tới 19h hàng ngày, để giảm lượng xe chờ tại các cửa khẩu. ",
  },
  {
    id: "3",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2023/03/16/sr-jpeg-1678953649-7770-1678954678.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=dNwFqkmIOR2tkDCan6ZUrw",
    title: "Nông sản Việt hút khách Trung Quốc",
    content:
      "Các thương lái Việt Nam tất bật gom sầu riêng, mít, sắn, điều xuất sang Trung Quốc với mức giá liên tục tăng do nhu cầu từ nước này ngày càng cao.",
  },
  {
    id: "4",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2023/03/15/mit-jpeg-1678872027-1678872146-9496-1678872344.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=k8CrqVAahIkNJ9pGDE7mDA",
    title: "Giá mít Thái tăng 7 lần",
    content:
      "Mỗi kg mít thái loại 1 giá bán tại vườn là 45.000-48.000 đồng, cao gấp 6-7 lần cùng kỳ năm ngoái",
  },
  {
    id: "5",
    imageUri:
      "https://i1-vnexpress.vnecdn.net/2023/02/13/DSC02098JPG-1676296086-3159-1676296253.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=V2hdYmTe6ZM8CWNV_Dgbqw",
    title: "Nhà vườn thua lỗ vì giá dừa giảm sâu",
    content:
      "Dừa Bến Tre đang vào đợt giảm giá mạnh, có lúc xuống còn hơn 1.000 đồng mỗi quả khiến nhà vườn thua lỗ",
  },
  {
    id: "6",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2023/02/01/sau-rieng-jpeg-1675240022-1675-9836-7723-1675240503.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=oOwT15P4FR4BR68ibQyw2Q",
    title: "Giá sầu riêng lên gần 200.000 đồng một kg",
    content:
      "Sầu riêng tại các nhà vườn đang được thu mua với giá 150.000-190.000 đồng mỗi kg, cao gấp ba lần cùng kỳ năm ngoái và là mức kỷ lục từ trước tới nay",
  },
  {
    id: "7",
    imageUri:
      "https://i1-vnexpress.vnecdn.net/2022/12/26/321065324829572368124386515315-7410-4285-1672031431.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=bVE7GPOqZOtdWpJvUaYG6g",
    title: "Rau xanh tăng giá",
    content:
      "Giá rau xanh tại các chợ nội thành tăng cao so với đầu tháng 12 do nguồn cung từ các vựa rau lớn sụt giảm, mất mùa bởi sâu bệnh, thời tiết",
  },
  {
    id: "8",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2022/11/01/-6581-1667277287.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=9na07KFSCdqtNJEsdtmCGQ",
    title: "Ớt chuông Hàn Quốc có mặt tại hơn 40 siêu thị Việt",
    content:
      "Ớt chuông Hàn Quốc NongHyup được Ant Farm phân phối đến hơn 40 siêu thị lớn trong vòng chưa tới một năm. ",
  },
  {
    id: "9",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2022/10/04/-3510-1664837607.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=C28Rw-ovjVbm3QxA2rpY9A",
    title: "Vài triệu đồng một trái bí ngô khổng lồ Đà Lạt",
    content:
      "Nhiều trái bí ngô trồng tại Đà Lạt nặng cả tạ mỗi quả, bán với giá vài triệu đồng đã được khách đặt mua hết từ sớm dù chưa tới Haloween. ",
  },
  {
    id: "10",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2022/09/29/-4225-1664438106.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=la0jidhUYabTztVJSsUMfw",
    title: "Quả hồng Đà Lạt tăng giá gấp đôi",
    content:
      "Năm ngoái một kg hồng có giá 25.000-30.000 đồng thì năm nay được các cửa hàng tăng giá gấp đôi",
  },
  {
    id: "11",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2022/08/11/xoai1-1660206343-1660206397-16-8804-3612-1660206637.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=k3HR0XYeOFHYeZd3U6prFQ",
    title: "Xoài cát Hòa Lộc 'sốt' giá trở lại",
    content:
      "Năm ngoái, một kg xoài cát Hòa Lộc rớt giá còn 35.000-60.000 đồng thì nay đã lên 175.000 đồng.",
  },
  {
    id: "  12 ",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2022/08/11/xoai1-1660206343-1660206397-16-8804-3612-1660206637.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=k3HR0XYeOFHYeZd3U6prFQ  ",
    title: "  Xoài cát Hòa Lộc 'sốt' giá trở lại ",
    content:
      " Năm ngoái, một kg xoài cát Hòa Lộc rớt giá còn 35.000-60.000 đồng thì nay đã lên 175.000 đồng. ",
  },
  {
    id: "  13 ",
    imageUri:
      "https://i1-kinhdoanh.vnecdn.net/2022/03/09/download-1646811202-8209-1646811242.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=-VwROGEGDxnw0dixSAWvxA ",
    title: " Ớt tươi lại được xuất khẩu sang Trung Quốc  ",
    content:
      " Sau 2 năm tạm dừng, Trung Quốc đã đồng ý cho 5 doanh nghiệp Việt Nam xuất khẩu ớt tươi sang thị trường này.  ",
  },
  {
    id: " 14  ",
    imageUri:
      " https://i1-suckhoe.vnecdn.net/2022/01/11/fiduf-1641876680-1968-1641876755.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=zgtlGRA_NYqYiKwfZeHkWg  ",
    title: "V-organic cung ứng thực phẩm xanh cho người dùng Việt ",
    content:
      "V-Organic cùng đối tác xây dựng chuỗi cung cứng, sản xuất nông sản thuận tự nhiên, nhằm đem đến nguồn thực phẩm sạch cho người dùng Việt.  ",
  },
  {
    id: "  15 ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/10/11/image002-1580691650-1125-15806-1159-2432-1633927964.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=vMCAV941wAzb3bvTyVSJKw  ",
    title: "Nhiều doanh nghiệp không biết Bình Dương có nông sản ",
    content:
      'Có hơn 10.000 ha cây ăn trái nhưng vì ít quảng bá, "thủ phủ công nghiệp" Bình Dương vẫn là xa lạ với doanh nghiệp tiêu thụ nông sản.   ',
  },
  {
    id: "  16 ",
    imageUri:
      "  https://i1-kinhdoanh.vnecdn.net/2021/09/20/im400840-1632109021-5990-1632109562.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=YO0GuRattgCaWCa4PkjUiw ",
    title: "Chuỗi cung ứng nông sản Đông Nam Á đứt gãy  ",
    content:
      "Malaysia và Việt Nam, hai nước Đông Nam Á cung cấp nhiều nguyên liệu nông sản cho sản xuất hàng tiêu dùng, đang khó trong sản xuất và phân phối.  ",
  },
  {
    id: "  17 ",
    imageUri:
      " https://i1-vnexpress.vnecdn.net/2021/09/18/khoai-lang-binh-tan-3060-16318-9461-6700-1631924352.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=R3wUoeipbC7A_bRpXNoCFQ  ",
    title: "Giá nhiều loại nông sản miền Tây chạm đáy ",
    content:
      "Giá khoai lang tím Nhật, bưởi Năm Roi, nhãn, chôm chôm… tại miền Tây đang ở mức rất thấp từ 2.000-9.000 đồng mỗi kg khiến nhiều nông dân thua lỗ.",
  },
  {
    id: " 18  ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/09/16/thanhlongBinhThuanVietQuoc-163-3112-5431-1631797687.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=xKFOusgCCyzYXzWbk1XuFA  ",
    title: "Trung Quốc dừng nhập thanh long tại cửa khẩu phụ Đông Hưng ",
    content:
      "Do phát hiện nCoV trên bao bì bọc thanh long, chính quyền Đông Hưng (Quảng Tây) thông báo dừng nhập khẩu 7 ngày tại cầu phao tạm Đông Hưng.  ",
  },
  {
    id: " 19  ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/08/31/hd57181614147237-1630388667-3348-1630388743.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=orlZfZSA0-PlYpUujD8uMQ  ",
    title: "Tiêu thụ nông sản các tỉnh miền Bắc gặp khó ",
    content:
      "Do ảnh hưởng Covid-19, giá thu mua một số loại nông sản tại miền Bắc đang giảm, việc tiêu thụ cũng không thuận lợi.  ",
  },
  {
    id: " 20  ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/08/30/Settop-1630291765-2083-1630291778.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=s6zH2OaCnJH28m3Kfh7gUw  ",
    title: "Na Chi Lăng - 'vàng' mọc trên núi đá vôi ",
    content:
      'Sau 40 năm bén duyên với vùng đất Chi Lăng, Lạng Sơn, loại na từ nơi xa tới đã trở thành "mỏ vàng" cho người dân nơi đây.  ',
  },
  {
    id: "  21 ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/08/06/thanhlongBinhThuan2VietQuoc-16-2680-9249-1628266837.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=fA712gndYZPqsrQcMkIPGg  ",
    title: "Hàng triệu tấn nông sản Nam Bộ, Tây Nguyên ùn ứ  ",
    content:
      "Bộ trưởng Công Thương cho biết, 5 triệu tấn lúa, gần 4 triệu tấn rau củ, 400 triệu quả trứng... của 26 tỉnh Nam Bộ, Tây Nguyên đang tìm cửa tiêu thụ. ",
  },
  {
    id: "  22 ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/08/01/saudonglanhsangAus-1627826081-6006-1627826143.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=08s2NlHR-JEv__goJDl6Uw   ",
    title: "Lần đầu quả sấu đông lạnh được bán tại Australia",
    content:
      "22 tấn quả sấu đông lạnh Việt Nam lần đầu được nhập khẩu, phân phối và bán tại thị trường Australia, giá bán trên 300.000 đồng một kg.  ",
  },
  {
    id: " 23  ",
    imageUri:
      " https://i1-kinhdoanh.vnecdn.net/2021/07/19/bodoithuhoachrauhoangtao-16266-3709-7388-1626697837.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=9vMJoF3Wua5y8C8HXqVJxQ ",
    title: "Quân đội hỗ trợ thu hoạch, vận chuyển nông sản cho phía Nam  ",
    content:
      "Bộ Quốc Phòng sẽ sử dụng lực lượng dân quân, bộ đội trên địa bàn hỗ trợ nông dân thu hoạch, vận chuyển nông sản khi các tỉnh phía Nam giãn cách xã hội.  ",
  },
  {
    id: "  24 ",
    imageUri:
      "  https://i1-vnexpress.vnecdn.net/2021/07/06/vaibacgiangngocthanh03jpeg1623-9384-3012-1625548221.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=nr89ycsp0Iot4ueWx7MCrw ",
    title: "Vải thiều năm nay rất thành công",
    content:
      "Nhờ kịch bản chi tiết nên dù gặp khó khăn do dịch Covid-19 sản lượng tiêu thụ vải vẫn đột phá, theo ông Nguyễn Quốc Toản, Cục trưởng Cục chế biến và Phát triển thị trường nông sản. ",
  },
];

const News = () => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <NewsItem
              imageUri={item.imageUri}
              title={item.title}
              content={item.content}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.tabbar}>
        <TabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "space-between",
  },
  items: {
    padding: 10,
    flex: 1,
  },
  tabbar: {},
});

export default News;
