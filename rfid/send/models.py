from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean
engine = create_engine('postgresql://postgres:Gateway@localhost:5432/localdb_1', echo = False)
meta = MetaData()

Logging = Table(
   'logging', meta, 
   Column('index', Integer, primary_key = True), 
   Column('gate_id', Integer), 
   Column('tag_number', String),
   Column('timestamp', String),
   Column('check', Boolean)
)

meta.create_all(engine)