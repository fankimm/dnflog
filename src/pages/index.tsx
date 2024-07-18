import { useQuery } from '@tanstack/react-query';
import fetcher from '@/common/fetcher';
import { Button, Form, Input, Select } from 'antd';
interface ServerList {
  rows: {
    serverId: string;
    serverName: string;
  }[];
}
export default function Home() {
  const [form] = Form.useForm();
  const { data: serverList } = useQuery<ServerList>({
    queryKey: ['serverList'],
    queryFn: () =>
      fetcher({
        url: `/df/servers?apikey=${process.env.NEXT_PUBLIC_DNF_API_KEY}` || '',
      }),
  });
  const { data: characterDetail, refetch } = useQuery({
    queryKey: ['characterDetail'],
    queryFn: () => {
      //https://api.neople.co.kr/df/servers/<serverId>/characters?characterName=<characterName>&jobId=<jobId>&jobGrowId=<jobGrowId>&isAllJobGrow=<isAllJobGrow>&limit=<limit>&wordType=<wordType>&apikey=auTmk6eTwFwO4czAO42SJNwmTwvj5ixV
      if (form.getFieldValue('character')) {
        const server = form.getFieldValue('server');
        return fetcher({
          url:
            `/df/servers/${
              server || 'all'
            }/characters?characterName=${form.getFieldValue(
              'character'
            )}&apikey=${process.env.NEXT_PUBLIC_DNF_API_KEY}` || '',
        });
      } else {
        return null;
      }
    },
  });
  const handleSearch = () => {
    refetch();
  };
  return (
    <>
      <Form form={form}>
        <Form.Item name="server" initialValue={'all'}>
          <Select
            options={[
              { label: '전체', value: 'all' },
              ...serverList?.rows.map((li) => ({
                label: li.serverName,
                value: li.serverId,
              })),
            ]}
          />
        </Form.Item>
        <Form.Item
          name="character"
          rules={[{ required: true, message: '캐릭터명을 입력해주세요.' }]}
        >
          <Input placeholder="캐릭터명" />
        </Form.Item>
        <Button onClick={handleSearch}>버튼</Button>
      </Form>
      <div className="flex flex-wrap gap-3">
        {characterDetail?.rows?.map((character) => (
          <div className="rounded-lg shadow-xl p-4" key={character.characterId}>
            <div>{character.jobGrowName}</div>
            <div>{character.jobName}</div>
            <div>{character.fame}</div>
            <div>{character.level}</div>
            <div>{character.server}</div>
          </div>
        ))}
      </div>
    </>
  );
}
