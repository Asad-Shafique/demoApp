import React,{useState} from 'react';
import { ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import generateListData from '../../utils/fake-data';
import { ListItem } from './components/item';

//
//

export interface IListItem {
  id: number; //here i changed the id type to number
  name: string;
  description: String;
  price: string;
  salePrice: any;
  brand: String;
}


/*Here i have implemented pagination to smooth the user experiene.
initially 20 items will be loaded, and on End reached the next 20 items will be loaded.

i have removed the list_data.map function as it is design to load all item at once, which will
be slow.
*/
 
const ListScreen = () => {
  const pageSize = 20;
  let pageNumber = 1;
  const [listData, setListData] = useState<IListItem[]>(() =>
    generateListData(pageSize, pageNumber)
  );
  const loadMoreItems = () => {
    pageNumber += 1;
    const newData = generateListData(pageSize, pageNumber);
    setListData((prevListData) => [...prevListData, ...newData]);
  };
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      {/* <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}> */}
      {/* {ListData.map(item => <ListItem key={item.id} item={item} />)} */}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={listData}
        keyExtractor={(item)=>item.id.toString()}  
        onEndReached={() =>
          loadMoreItems()
        }
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (<ListItem key={item.id} item={item} />)}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default ListScreen;
