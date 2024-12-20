import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
}


{/** GitHub REST API - hämtar data om repos med länken */}
const fetchRepos = async (dateLimit : string, language : string): Promise<Repo[]> => {

  const GIT_TOKEN = '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';
  const response = await fetch(
    // q = (stars > 0  +  created (date) > two months ago)  &  sort=stars  &  order=descending  &  30 resultat
    `https://api.github.com/search/repositories?q=stars:>0+created:>=${dateLimit}+language=${language}&sort=stars&order=desc&per_page=30`,
    {
      headers: {
        Authorization: `token ${GIT_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data.items;
};


const generateList = (repos : Repo[], styles : any, repoPressed: (repo: Repo) => void) => { 
  return (
    <View>
      {repos.map((repo) => (
        <TouchableOpacity 
          style={styles.repoListItem} 
          key={repo.id || ""} 
          onPress={() => { repoPressed(repo) }}
        >
          <Text style={styles.header}>{repo.name || ""}</Text>
          <Text style={styles.link}>{repo.full_name || ""}</Text>
          {/** <Text style={styles.desc}>{repo.description || 'No description available.'}</Text> */}

          <View style={styles.statsWrapper}>
            <View style={styles.stars}>
              <Text>Stars: {repo.stargazers_count || ""}</Text>
            </View>
            <View style={styles.forks}>
              <Text>Forks: {repo.forks_count || ""}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}


export default function ResultScreen() {

  const route = useRoute();
  const { language } = route.params; // VSCode ger varning här men fungerar ändå
  const navigation = useNavigation();

  {/** React states och effects */}
  const [n, setN] = useState(10); // månadsgräns
  const [repos, setRepos] = useState<Repo[]>([]); // datamängd
  const [dateLimit, setDateLimit] = useState(''); // filtrering
  const [loading, setLoading] = useState<boolean>(true); // loading
  const [selectedLimit, setSelectedLimit] = React.useState(""); // dropdown
  const [modalVisible, setModalVisible] = useState<boolean>(false); // modal
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null); // selected repo

  {/** repo data fetching & reload */}
  useEffect(() => { // när n ändras
    setLoading(true);
    const today = new Date();
    const nMonthsAgo = new Date(today.setMonth(today.getMonth() - n));
    setDateLimit(nMonthsAgo.toISOString().split('T')[0]); // så sätter vi dateLimit till något nytt
  }, [n]);

  useEffect(() => { // och när dateLimit då ändras
    if (!dateLimit) return;
    const getRepos = async () => { // så byter vi repoData
      try {
        const repoData = await fetchRepos(dateLimit, language);
        setRepos(repoData);  // variabel repo sätts till ny mängd
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    getRepos();
  }, [dateLimit]);

  const handleRepoPress = (repo: Repo) => { // den här skickas med till generateList()
    setSelectedRepo(repo);
    setModalVisible(true);
  };

  {/** dropdown meny data */}
  const months = [
      {key:'1', value:1},
      {key:'2', value:2},
      {key:'3', value:3},
      {key:'4', value:4},
      {key:'5', value:5},
      {key:'6', value:6},
      {key:'7', value:7},
      {key:'8', value:8},
      {key:'9', value:9},
      {key:'10', value:10},
      {key:'11', value:11},
      {key:'12', value:12},
  ]

  

  return (

    <ScrollView contentContainerStyle={styles.body}>

      <TouchableOpacity 
      style={styles.backButton}
      onPress={() => navigation.navigate('Home')} // VSCode ger varning här men funkar ändå
      >
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.header}>
          Top New {language} Repositories
        </Text>

        <View style={styles.dropdownWrapper}>
          <Text style={styles.link}>Created maximum: </Text>
          <SelectList
            setSelected={setSelectedLimit}
            onSelect={() => setN(parseInt(selectedLimit))}
            data={months}
            save="key"
            dropdownTextStyles={styles.dropdownText}
            inputStyles={styles.dropdownText}
            placeholder='10'
            boxStyles={styles.dropdownBoxStyles}
            dropdownItemStyles={styles.dropdownItemStyles}
            dropdownStyles={styles.dropdownStyles} />
          <Text style={styles.link}> months ago </Text>
        </View>

        {loading ? (
          <View style={styles.wrapper}>
            <Text style={styles.link}>Loading...</Text>
          </View>
        ) : (
          generateList(repos, styles, handleRepoPress)
        )}


        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0.7}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
        >
          <View style={styles.modalContent}>
            {selectedRepo && (
              <View>
                <Text style={styles.modalHeader}>{selectedRepo.name}</Text>
                <Text style={styles.modalLink}>
                  {selectedRepo.full_name}
                </Text>
                <Text style={styles.desc}>
                  {selectedRepo.description || "No description"}
                </Text>
                <Text style={{ marginTop: 16 }}>Created: {selectedRepo.created_at.split('T')[0]}</Text>
                <Text>Stars: {selectedRepo.stargazers_count}</Text>
                <Text>Forks: {selectedRepo.forks_count}</Text>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </ScrollView>
      
  );
}


const styles = StyleSheet.create({
  body: {
    backgroundColor: '#000'
  },
  wrapper: {
    marginTop: 30,
    alignItems: 'center',
    paddingBottom: 200,
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: '#333',
    borderRadius: 10
  },
  header: {
    fontSize: 22,
    color: '#EEE',
  },
  repoListItem: {
    backgroundColor: '#333',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: 15,
    width: 350,
    borderRadius: 10
  },
  link: {
    color: '#AAA',
    fontSize: 16
  },
  statsWrapper: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-end'
  },
  stars: {
    backgroundColor: '#FFDD00',
    padding: 5,
  },
  forks: {
    backgroundColor: '#AADDDD',
    padding: 5,
    marginLeft: 5
  },
  dropdownWrapper: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 15,
  },
  dropdownText: {
    color: '#000',
    fontWeight: 800,
    fontSize: 16,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    marginVertical: 0
  },
  dropdownBoxStyles: {
    width: 50,
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 9,
    paddingVertical: 9,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownItemStyles: {
    width: 40,
    paddingHorizontal: 9,
    paddingVertical: 5,
    alignItems: 'center',
    margin: 0,
    backgroundColor: '#eee'
  },
  dropdownStyles: {
    width: 50,
    height: 800,
    marginHorizontal: 15,
    zIndex: 999,
    position: "absolute",
    backgroundColor: '#eee',
    alignItems: 'center'
  },
  modalContent: {
    alignSelf: 'center',
    minWidth: 200,
    backgroundColor: '#EEE',
    padding: 20,
    alignItems: 'center',
    minHeight: 200,
    maxHeight: 600,
    borderRadius: 10
  },
  modalHeader: {
    color: '#111',
    fontSize: 28,
  },
  modalLink: {
    color: '#555',
    fontSize: 18
  },
  desc: {
    color: '#111',
    marginTop: 18,
    fontSize: 16,
    marginBottom: 10,
  },

});