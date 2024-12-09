import {GameCreator} from "@/context/application/GameCreator";
import mongodb from "@/context/infrastructure/mongodb";
import {GameRetriever} from "@/context/application/GameRetriever";
import {MongoGameRepository} from "@/context/infrastructure/MongoGameRepository";
import {MemberAdder} from "@/context/application/MemberAdder";
import {GameResolver} from "@/context/application/GameResolver";
import {MembersToAvoidUpdater} from "@/context/application/MembersToAvoidUpdater";
import {EventEmitterBus} from "@/context/infrastructure/EventEmitterBus";
import {FrontendBroadcaster} from "@/context/application/FrontendBroadcaster";
import {AblyFrontendNotifier} from "@/context/infrastructure/AblyFrontendNotifier";

const gameRepository = new MongoGameRepository(mongodb);

const eventBus = new EventEmitterBus();

const frontendNotifier = new AblyFrontendNotifier();

export const frontendBroadcaster = new FrontendBroadcaster(frontendNotifier, eventBus);

export const gameCreator = new GameCreator(gameRepository);

export const gameRetriever = new GameRetriever(gameRepository);

export const memberAdder = new MemberAdder(gameRepository, eventBus);

export const gameResolver = new GameResolver(gameRepository, eventBus);

export const membersToAvoidUpdater = new MembersToAvoidUpdater(gameRepository);